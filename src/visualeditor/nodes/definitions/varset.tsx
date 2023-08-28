import React from 'react';
import { CodeNodeDefinition } from '@/visualeditor';
import { DEFAULT_CORE_CATEGORY } from '../../utils/consts';
import { buildNodeHeight } from '@/visualeditor';
import { standard } from '../..';
import { VariableSetNode } from '../VariableSetNode';

const width = 160;
const height = buildNodeHeight(2);

export const VarSetNodeDefinition: CodeNodeDefinition = {
  name: 'varset',
  label: 'Set Variable',
  type: 'function',
  component: VariableSetNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'value',
        width,
        position: 1,
      })
      .port.input.text(),
  ],
  outputs: [standard.execPinOutput(width)],
  code: ({ node, getConnectionInput }) => {
    return `${node.data?.name ?? ''} = ${
      getConnectionInput('value') ?? JSON.stringify(node.data?.value ?? '')
    };\n`;
  },
};
