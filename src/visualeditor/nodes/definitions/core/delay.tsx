import { standard } from '../../..';
import { CodeNodeDefinition } from '@/visualeditor';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, DEFAULT_NODE_WIDTH } from '@/visualeditor';
import { BaseNode } from '../../BaseNode';

const width = DEFAULT_NODE_WIDTH;
const height = buildNodeHeight(2);

export const DelayNodeDefinition: CodeNodeDefinition = {
  name: 'delay',
  label: 'Delay',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        width,
        name: 'ms',
        position: 1,
      })
      .port.input.number(),
  ],
  outputs: [
    standard.execPinOutput(width),
  ],
  code: ({ node, getConnectionInput, getConnectionExecOutput }) => {
    const ms = getConnectionInput('ms') ?? node.data?.ms ?? 0;

    return `delay(${ms})`;
  },
  debug: ({ node, getConnectionInput, getConnectionExecOutput }) => {
    const ms = getConnectionInput('ms') ?? node.data?.ms ?? 0;

    return `console.log('delay ${ms} milliseconds')`;
  }
};
