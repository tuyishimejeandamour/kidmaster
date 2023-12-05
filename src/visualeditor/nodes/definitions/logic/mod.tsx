import {CodeNodeDefinition} from '../../../store/node';
import {buildCombinedLogicDefinition} from './_utils';

export const ModNodeDefinition: CodeNodeDefinition =
    buildCombinedLogicDefinition({
        name: 'mod',
        label: 'Mod',
        outputCode(input1, input2) {
            return `(${input1} % ${input2})`;
        },
    });
