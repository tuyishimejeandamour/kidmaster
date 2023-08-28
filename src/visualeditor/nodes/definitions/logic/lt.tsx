import { CodeNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const LTNodeDefinition: CodeNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'lt',
    label: 'Less than',
    outputCode(input1, input2) {
      return `(${input1} < ${input2})`;
    },
  });
