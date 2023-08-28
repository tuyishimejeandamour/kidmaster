import { CodeNodeDefinition } from '../../../store/node';
import { BooleanInputPreset } from '../../components/preset/BooleanInputPreset';
import { buildCombinedLogicDefinition } from './_utils';

/**
 * 逻辑与
 */
export const AnlNodeDefinition: CodeNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'and',
    label: 'Logic And',
    outputCode(input1, input2) {
      return `(${input1} && ${input2})`;
    },
    InputPreset: BooleanInputPreset,
    defaultValue: false,
  });
