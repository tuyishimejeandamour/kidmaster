import { CodeNodeDefinition } from '@/visualeditor';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '@/visualeditor';
import { standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const LogErrorNodeDefinition: CodeNodeDefinition = {
  name: 'log-error',
  label: 'Error',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'message',
        width,
        position: 1,
      })
      .port.input.text()
  ],
  outputs: [standard.execPinOutput(width)],
  code: ({ node, getConnectionInput }) => {
    const message =
      getConnectionInput('message') ?? JSON.stringify(node.data?.message ?? '');
    const error = getConnectionInput('error') ?? 'err';
    return `console.error(${message}, ${error});\n`;
  },
};
