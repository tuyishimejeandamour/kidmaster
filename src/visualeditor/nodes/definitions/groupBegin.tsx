import { CodeckNodeDefinition } from '../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../utils/size-helper';
import { standard } from '../..';
import { GroupStart } from '../GroupBegin';

const width = defaultNodeWidth - 80;
const height = buildNodeHeight(0.3);

export const GroupBeginNodeDefinition: CodeckNodeDefinition = {
  name: 'groubBegin',
  label: 'group',
  type: 'logic',
  component: GroupStart,
  width,
  height,
  hidden: true,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [],
  outputs: [standard.execPinOutput(width,0.02)],
};
