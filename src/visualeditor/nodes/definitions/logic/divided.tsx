import { CodeNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const DividedNodeDefinition: CodeNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'divided',
    label: 'Divided',
    outputCode(input1, input2) {
      return `(${input1} / ${input2})`;
    },
  });
