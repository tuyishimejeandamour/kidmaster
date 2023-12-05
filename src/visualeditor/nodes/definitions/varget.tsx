import {buildNodeHeight, buildPinPosX, buildPinPosY, CodeNodeDefinition} from '@/visualeditor';
import {DEFAULT_CORE_CATEGORY} from '../../utils/consts';
import {VariableNode} from '@/visualeditor/nodes/VariableNode';

const width = 130;
const height = buildNodeHeight(1);

export const VarGetNodeDefinition: CodeNodeDefinition = {
    name: 'varget',
    label: 'Value Get',
    type: 'logic',
    component: VariableNode,
    width,
    height,
    category: DEFAULT_CORE_CATEGORY,
    hidden: true,
    inputs: [],
    outputs: [
        {
            name: 'variable',
            type: 'port',
            position: {
                x: buildPinPosX(width, 'output'),
                y: buildPinPosY(0),
            },
        },
    ],
};
