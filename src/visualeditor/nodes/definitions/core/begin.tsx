import { standard } from '../../..';
import { CodeNodeDefinition } from '@/visualeditor';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '@/visualeditor';
import { Bigend } from '../../bigend';

const width = 120;
const height = buildNodeHeight(0.3);

export const BeginNodeDefinition: CodeNodeDefinition = {
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
