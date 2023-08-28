import { CodeNodeDefinition } from '@/visualeditor';
import { buildCombinedLogicDefinition } from './_utils';

export const GTENodeDefinition: CodeNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'gte',
    label: 'Greater than or equal',
    outputCode(input1, input2) {
      return `(${input1} >= ${input2})`;
    },
  });
