import { standard } from '../../..';
import { CodeckNodeDefinition } from '../../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { Bigend } from '../../bigend';

const width = defaultNodeWidth - 80;
const height = buildNodeHeight(0.3);

export const BeginNodeDefinition: CodeckNodeDefinition = {
  name: 'begin',
  label: 'Begin',
  type: 'begin',
  component: Bigend,
  width,
  height: height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [],
  outputs: [standard.execPinOutput(width,0.02)],
};
