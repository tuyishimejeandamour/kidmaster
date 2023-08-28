import { CodeNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const MultiplyNodeDefinition: CodeNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'multiply',
    label: 'Multiply',
    outputCode(input1, input2) {
      return `(${input1} * ${input2})`;
    },
  });
