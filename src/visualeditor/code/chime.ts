import {isUndefined, uniqBy, values} from 'lodash-es';
import {VarGetNodeDefinition} from '../nodes/definitions/varget';
import {ConnectInfo, useConnectionStore} from '../store/connection';
import {CodeFunctionPrepare, CodeNode, CodeNodeDefinition, CodePrepare, useNodeStore,} from '../store/node';
import {formatFunctionIndent, STANDARD_PIN_EXEC_OUT, useVariableStore} from '@/visualeditor';


export class CodeCompiler {
    prepares: CodePrepare[] = [];
    moduleType: 'commonjs' | 'esmodule' = 'esmodule';
    private _mode: 'code' | 'debug' = 'code';

    get mode(): "code" | "debug" {
        return this._mode;
    }

    set mode(value: "code" | "debug") {
        this._mode = value;
    }

    get nodeMap() {
        return useNodeStore.getState().nodeMap;
    }

    get nodeDefinition() {
        return useNodeStore.getState().nodeDefinition;
    }

    get connections() {
        return useConnectionStore.getState().connections;
    }

    get variableMap() {
        return useVariableStore.getState().variableMap;
    }


    generate() {
        const begin = this.findBegin();
        let codeText = '';

        codeText += this.generateVariable();
        codeText += this.generateCodeFromNode(this.getExecNext(begin.id));

        codeText = this.generatePrepareCode() + codeText; // 在头部追加 prepare code

        return codeText;
    }

    generateCodeFromNode(startNode: CodeNode | null) {
        let codeText = '';
        let currentNode: CodeNode | null = startNode;

        while (currentNode !== null) {
            const definition = this.nodeDefinition[currentNode.name];
            this.collectPrepare(definition);

            const codeFn = definition[this._mode];
            const node = currentNode;

            if (codeFn) {
                const buildPinVarName = (pinName: string, nodeId?: string) => {
                    return this.buildPinVarName(pinName, nodeId ?? node.id);
                };


                codeText += codeFn({
                    node,
                    buildPinVarName,
                    getConnectionInput: (pinName: string, nodeId?: string) =>
                        this.getConnectionInput(pinName, nodeId ?? node.id),
                    getConnectionExecOutput: (pinName: string, nodeId?: string) =>
                        this.getConnectionExecOutput(pinName, nodeId ?? node.id),
                });
            }

            currentNode = this.getExecNext(currentNode.id);
        }

        return codeText;
    }

    buildPinVarName(pinName: string, nodeId: string) {
        return `_${nodeId}_${pinName}`;
    }

    getConnectionInput(pinName: string, nodeId: string): string | null {
        const connection: ConnectInfo | undefined = this.connections.find(
            (item) => item.toNodeId === nodeId && item.toNodePinName === pinName
        );
        if (!connection) {
            return null;
        }

        const fromNode: CodeNode | undefined =
            this.nodeMap[connection.fromNodeId];
        if (!fromNode) {
            return null;
        }

        if (fromNode.name === VarGetNodeDefinition.name) {
            return fromNode.data?.name ?? '';
        }

        const fromNodeDef = this.nodeDefinition[fromNode.name];
        if (!fromNodeDef) {
            return null;
        }
        const outputDef = fromNodeDef.outputs.find(
            (output) => output.name === connection.fromNodePinName
        );
        if (!outputDef) {
            return null;
        }

        if (outputDef.code) {
            this.collectPrepare(fromNodeDef);

            return (
                outputDef.code({
                    node: fromNode,
                    buildPinVarName: (pinName: string, nodeId?: string) =>
                        this.buildPinVarName(pinName, nodeId ?? fromNode.id),
                    getConnectionInput: (pinName: string, nodeId?: string) =>
                        this.getConnectionInput(pinName, nodeId ?? fromNode.id),
                    getConnectionExecOutput: (pinName: string, nodeId?: string) =>
                        this.getConnectionExecOutput(pinName, nodeId ?? fromNode.id),
                }) ?? ''
            );
        } else {
            return this.buildPinVarName(
                connection.fromNodePinName,
                connection.fromNodeId
            );
        }
    }

    getConnectionExecOutput(pinName: string, nodeId: string): string | null {
        const execNode = this.getExecNext(nodeId, pinName);
        if (!execNode) {
            return null;
        }

        return this.generateCodeFromNode(execNode);
    }

    generateVariable(): string {
        const list = values(this.variableMap);
        if (list.length === 0) {
            return '';
        }

        return (
            list
                .map((item) => {
                    if (isUndefined(item.defaultValue)) {
                        return `let ${item.name};`;
                    } else {
                        return `let ${item.name} = ${JSON.stringify(item.defaultValue)};`;
                    }
                })
                .join('\n') + '\n\n'
        );
    }

    generatePrepareCode(): string {
        const imports: Record<string, [string, string][]> = {};
        const functions: CodeFunctionPrepare[] = [];

        this.prepares.forEach((item) => {
            if (item.type === 'import') {
                if (!imports[item.module]) {
                    imports[item.module] = [];
                }

                if (item.member) {
                    const member: [string, string] =
                        typeof item.member === 'string'
                            ? [item.member, item.member]
                            : item.member;

                    imports[item.module] = uniqBy(
                        [...imports[item.module], member],
                        (item) => item.join(':')
                    );
                }
            }

            if (item.type === 'function') {
                functions.push(item);
            }
        });

        let prepareCode = '';
        const importEntries = Object.entries<[string, string][]>(imports);
        if (Array.isArray(importEntries) && importEntries.length > 0) {
            prepareCode +=
                importEntries
                    .map(([module, members]) => {
                        if (this.moduleType === 'commonjs') {
                            if (members.length === 0) {
                                return `require('${module}');`;
                            }

                            return members
                                .map((member) => {
                                    if (member[0] === '*') {
                                        return `const ${member[1]} = require('${module}');`;
                                    } else {
                                        return `const ${member[1]} = require('${module}').${member[0]};`;
                                    }
                                })
                                .join('\n');
                        } else {
                            if (members.length === 0) {
                                return `import '${module}';`;
                            }

                            return `import { ${members
                                .map((member) => {
                                    if (member[0] !== 'default' && member[0] === member[1]) {
                                        return String(member);
                                    } else {
                                        return `${member[0]} as ${member[1]}`;
                                    }
                                })
                                .join(', ')} } from '${module}';`;
                        }
                    })
                    .join('\n') + '\n\n';
        }
        if (Array.isArray(functions) && functions.length > 0) {
            prepareCode +=
                functions
                    .map(
                        (func) =>
                            `function ${func.name}(${func.parameters.join(', ')}) {
  ${formatFunctionIndent(func.body, 2)}
}`
                    )
                    .join('\n\n') + '\n\n';
        }

        return prepareCode;
    }

    private findBegin(): CodeNode {
        const nodes = values(this.nodeMap).filter(
            (node) => this.nodeDefinition[node.name]?.type === 'begin'
        );

        if (nodes.length === 0) {
            throw new Error('Not found Begin node.');
        }

        if (nodes.length > 1) {
            throw new Error('Begin node should be only one');
        }

        return nodes[0];
    }

    private getExecNext(
        nodeId: string,
        pinName = STANDARD_PIN_EXEC_OUT
    ): CodeNode | null {
        const node = this.nodeMap[nodeId];
        if (!node) {
            return null;
        }
        const id = node.id?.includes("group") ? this.getExecGroup(nodeId) : nodeId
        const execNextConnection = this.connections.filter(
            (conn) => conn.fromNodeId === id && conn.fromNodePinName === pinName
        );
        if (execNextConnection.length === 0) {
            return null;
        }

        if (execNextConnection.length > 1) {
            throw new Error(
                `node ${nodeId} have more than one standard exec connection`
            );
        }

        return this.nodeMap[execNextConnection[0].toNodeId] ?? null;
    }

    private getExecGroup(nodeId: string): string | null {

        const groupStarter = values(this.nodeMap).filter((node) => node.name === "groupBegin" && node.space === nodeId
        );
        if (groupStarter.length < 1 || groupStarter.length > 1) {
            return null;
        }
        return groupStarter[0].id
    }


    private collectPrepare(nodeDef: Pick<CodeNodeDefinition, 'prepare'>) {
        if (Array.isArray(nodeDef.prepare) && nodeDef.prepare.length > 0) {
            this.prepares.push(...nodeDef.prepare);
        }
    }
}
