import {buildNodeHeight, CodeNodeDefinition, DEFAULT_NODE_WIDTH} from '@/visualeditor';
import {BaseNode} from '../../BaseNode';
import {DEFAULT_CORE_CATEGORY} from '../../../utils/consts';
import {standard} from '../../..';

const width = DEFAULT_NODE_WIDTH;
const height = buildNodeHeight(2);

export const LoopNodeDefinition: CodeNodeDefinition = {
    name: 'loop',
    label: 'Loop',
    type: 'function',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_CORE_CATEGORY,
    inputs: [
        standard.execPinInput(width),
        standard
            .pin({
                name: 'times',
                width,
                position: 1,
            })
            .port.input.number(),
    ],
    outputs: [
        standard.execPinOutput(width),
        standard
            .pin({
                name: 'body',
                width,
                position: 1,
            })
            .exec.output(),
        standard
            .pin({
                name: 'inc',
                width,
                position: 2,
            })
            .port.output.base(),
    ],
    debug: ({
                node,
                buildPinVarName,
                getConnectionInput,
                getConnectionExecOutput,
            }) => {
        const inc = buildPinVarName('inc');
        const times = getConnectionInput('times') ?? node.data?.times ?? 0;
        const body =
            getConnectionExecOutput('body')?.trim().split('\n').join('\n  ') ?? '';

        return `for (let ${inc} = 0; ${inc} < ${times}; ${inc}++) {
  ${body}
}\n`;
    },
    code: ({
               node,
               buildPinVarName,
               getConnectionInput,
               getConnectionExecOutput,
           }) => {

        const inc = buildPinVarName('inc');
        const _times = getConnectionInput('times') ?? node.data?.times ?? 0;
        const _body =
            getConnectionExecOutput('body')?.trim().split('\n').join('\n  ') ?? '';
        return `console.log('const ${inc} = 0;time=${_times};body=${_body}')`
    }
};
