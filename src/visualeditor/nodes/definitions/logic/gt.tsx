import {CodeNodeDefinition} from '@/visualeditor';
import {buildCombinedLogicDefinition} from './_utils';

export const GTNodeDefinition: CodeNodeDefinition =
    buildCombinedLogicDefinition({
        name: 'gt',
        label: 'Greater than',
        outputCode(input1, input2) {
            return `(${input1} > ${input2})`;
        },
    });
