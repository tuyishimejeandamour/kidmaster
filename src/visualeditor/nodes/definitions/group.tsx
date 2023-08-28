import { CodeNodeDefinition } from '@/visualeditor';
import { DEFAULT_CORE_CATEGORY } from '../../utils/consts';
import { buildNodeHeight } from '@/visualeditor';
import { standard } from '../..';
import { GroupNode } from '../Group';

const width = 130;
const height = buildNodeHeight(1);

export const GroupNodeDefinition: CodeNodeDefinition = {
  name: 'group',
  label: 'group',
  type: 'logic',
  component: GroupNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [ standard.execPinInput(width)],
  outputs: [],
};
