import {CodeNodeDefinition} from '../../../store/node';
import {buildCombinedLogicDefinition} from './_utils';

export const AddNodeDefinition: CodeNodeDefinition =
    buildCombinedLogicDefinition({
        name: 'add',
        label: 'Add',
        outputCode(input1, input2) {
            return `(${input1} + ${input2})`;
        },
    });
