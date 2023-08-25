import { standard } from '../../..';
import { CodeckNodeDefinition } from '@/visualeditor';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '@/visualeditor';
import { BaseNode } from '../../BaseNode';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const DelayNodeDefinition: CodeckNodeDefinition = {
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
};
