import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import Konva from 'konva';
import {cloneDeep, set as _set, values} from 'lodash-es';
import {useConnectionStore} from './connection';
import {BeginNodeDefinition} from '../nodes/definitions/core/begin';
import {LogNodeDefinition} from '../nodes/definitions/core/log';
import {BEGIN_NODE_ID} from '../utils/consts';
import {useUIStore} from './ui';
import React from "react";

export type CodeNodeType = 'begin' | 'return' | 'function' | 'logic' | 'call' | 'grouping';

export type CodeFn = (ctx: {
    node: CodeNode;
    buildPinVarName: (pinName: string, nodeId?: string) => string;
    getConnectionInput: (pinName: string, nodeId?: string) => string | null;
    getConnectionExecOutput: (pinName: string, nodeId?: string) => string | null;
}) => string;

export interface CodeNode {
    id: string;
    name: string;
    displayName?: string;
    space?: string
    position: Konva.Vector2d;
    data?: Record<string, any>;
}

export interface CodeNodeComponentProps {
    id: string;
}

export type CodeNodePortType = 'port' | 'exec';

export interface CodeNodePinDefinition {
    html?: React.ComponentType<{
        nodeId: string;
    }>;
    name: string;
    type: CodeNodePortType;
    position: Konva.Vector2d;
    defaultValue?: any;
    renderType?: string;
    component?: React.ComponentType<{
        nodeId: string;
    }>;
}

export interface CodeImportPrepare {
    type: 'import';
    module: string;
    member?: string | [string, string];
    version?: string;
}

export interface CodeFunctionPrepare {
    type: 'function';
    name: string;
    parameters: string[];
    body: string;
}

export type CodePrepare = CodeImportPrepare | CodeFunctionPrepare;

export interface UIDefinition {
    backgroundColor?: string;
    headerColor?: string;
    radius?: string[];
    angle?: string

}

export interface CodeNodeDefinition {
    name: string;
    label: string;
    type: CodeNodeType;
    width: number;
    height: number;
    category: string;
    hidden?: boolean;
    ui?: UIDefinition;
    inputs: CodeNodePinDefinition[];
    outputs: (CodeNodePinDefinition & { code?: CodeFn, debug?: CodeFn })[];
    component: React.ComponentType<CodeNodeComponentProps>;
    html?: React.ComponentType<CodeNodeComponentProps>;

    prepare?: CodePrepare[];
    code?: CodeFn;
    debug?: CodeFn;
}

interface NodeState {
    nodeMap: Record<string, CodeNode>;
    currentId: string;
    nodeDefinition: Record<string, CodeNodeDefinition>;

    regNode: (definition: CodeNodeDefinition) => void;
    updateNodePos: (nodeId: string, position: Konva.Vector2d) => void;
    moveNode: (nodeId: string, deltaX: number, deltaY: number) => void;
    getNodeDefinition: (nodeId: string) => CodeNodeDefinition | null;
    getPinDefinitionByName: (
        nodeId: string,
        pinName: string
    ) => CodeNodePinDefinition | null;
    createNode: (
        nodeName: string,
        position: Konva.Vector2d,
        data?: CodeNode['data'],
        group?: string,
    ) => void;

    setNodeData: (nodeId: string, key: string, value: unknown) => void;
    removeNode: (nodeId: string) => void;
    resetNode: () => void;

    getId(): string;
}

const buildDefaultNodeMap = () =>
    cloneDeep({
        [BEGIN_NODE_ID]: {
            id: BEGIN_NODE_ID,
            name: BeginNodeDefinition.name,
            position: {
                x: 200,
                y: 50,
            },
        },
        log: {
            id: 'log',
            name: LogNodeDefinition.name,
            position: {
                x: 200,
                y: 150,
            },
            space: "main",
            data: {
                message: 'Welcome',
            },
        }
    });

export const useNodeStore = create<NodeState>()(
    immer((set, get) => ({
        nodeMap: buildDefaultNodeMap(),
        nodeDefinition: {},
        currentId: '0',
        regNode: (definition: CodeNodeDefinition) => {
            set((state) => {
                if (state.nodeDefinition[definition.name]) {
                    console.warn('This node is registered', definition.name);
                    return;
                }

                state.nodeDefinition[definition.name] = definition;
            });
        },
        updateNodePos: (nodeId: string, position: Konva.Vector2d) => {
            set((state) => {
                const node = state.nodeMap[nodeId];
                if (!node) {
                    console.warn('Not found this node:', nodeId);
                    return;
                }

                node.position = position;
            });
        },
        moveNode: (nodeId, deltaX, deltaY) => {
            set((state) => {
                const node = state.nodeMap[nodeId];
                if (!node) {
                    console.warn('Not found this node:', nodeId);
                    return;
                }

                node.position.x += deltaX;
                node.position.y += deltaY;
            });
        },
        getNodeDefinition: (nodeId) => {
            const {nodeMap, nodeDefinition} = get();
            const node = nodeMap[nodeId];
            if (!node) {
                return null;
            }

            const definition = nodeDefinition[node.name];
            return definition ?? null;
        },
        getPinDefinitionByName: (nodeId, pinName) => {
            const {getNodeDefinition} = get();
            const definition: CodeNodeDefinition | null = getNodeDefinition(nodeId);
            if (!definition) {
                return null;
            }

            return (
                [...definition.inputs, ...definition.outputs].find(
                    (item) => item.name === pinName
                ) ?? null
            );
        },
        createNode: (nodeName, position, data) => {
            set((state) => {
                const activeSpace = useUIStore.getState().activeSpace
                let id = get().getId();
                if (nodeName.includes("group")) {
                    id = `group_${nodeName.split("_")[1]}_${id}`
                    const another = `$gb_${id}`
                    state.nodeMap[another] = {
                        id: another,
                        name: "groupBegin",
                        displayName: nodeName.split("_")[1],
                        position: {
                            x: 200,
                            y: 150,
                        },
                        data,
                        space: id

                    };
                } else if (nodeName === "function") {
                    id = `function_${id}`
                }

                if (activeSpace.space === "group" && nodeName.includes("group")) {
                    state.nodeMap[id] = {
                        id,
                        name: "group",
                        displayName: nodeName.split("_")[1],
                        position,
                        data,
                        space: "main"

                    };
                } else {
                    state.nodeMap[id] = {
                        id,
                        name: !nodeName.includes("group") ? nodeName : "group",
                        displayName: !nodeName.includes("group") ? nodeName : nodeName.split("_")[1],
                        position,
                        data,
                        space: activeSpace.space === "group" ? activeSpace.name : "main"

                    };
                }
            });
        },
        setNodeData: (nodeId, key, value) => {
            set((state) => {
                const node = state.nodeMap[nodeId];
                if (!node) {
                    console.warn('Not found node', nodeId);
                    return;
                }

                _set(node, ['data', key], value);
            });
        },
        removeNode: (nodeId) => {
            if (nodeId === BEGIN_NODE_ID) {
                return;
            }

            set((state) => {
                //TODO: revise this logic to remove all recursive nodes
                if (state.nodeMap[nodeId].space !== "main") {
                    values(state.nodeMap).map((node) => {
                        if (node.space === nodeId) {
                            useConnectionStore
                                .getState()
                                .connections.filter(
                                (connection) =>
                                    connection.fromNodeId === nodeId || connection.toNodeId === nodeId
                            )
                                .forEach((item) => {
                                    useConnectionStore.getState().removeConnection(item.id);
                                });
                            delete state.nodeMap[node.id]
                        }
                    })
                    delete state.nodeMap[nodeId];
                } else {
                    useConnectionStore
                        .getState()
                        .connections.filter(
                        (connection) =>
                            connection.fromNodeId === nodeId || connection.toNodeId === nodeId
                    )
                        .forEach((item) => {
                            useConnectionStore.getState().removeConnection(item.id);
                        });
                    delete state.nodeMap[nodeId];
                }
            });
        },

        resetNode: () => {
            set({
                nodeMap: buildDefaultNodeMap(),
            });

            useConnectionStore.getState().connections.forEach((item) => {
                useConnectionStore.getState().removeConnection(item.id);
            });
        },
        getId: () => {
            const id = get().currentId;
            set((state) => {
                state.currentId = (Number(id) + 1).toString();
            });
            return id;
        },

    }))
);

export function regNode(definition: CodeNodeDefinition) {
    useNodeStore.getState().regNode(definition);
}
