import {buildNodeHeight, CodeNodeDefinition, DEFAULT_NODE_WIDTH} from '@/visualeditor';
import {DEFAULT_CORE_CATEGORY} from '../../utils/consts';
import {standard} from '../..';
import {GroupStart} from '../GroupBegin';

const width = DEFAULT_NODE_WIDTH - 80;
const height = buildNodeHeight(0.3);

export const GroupBeginNodeDefinition: CodeNodeDefinition = {
    name: 'groupBegin',
    label: 'group',
    type: 'logic',
    component: GroupStart,
    width,
    height,
    hidden: true,
    category: DEFAULT_CORE_CATEGORY,
    inputs: [],
    outputs: [standard.execPinOutput(width, 0.02)],
};
