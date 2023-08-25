import React from 'react';
import { CodeckNodeDefinition } from '@/visualeditor';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '@/visualeditor';
import { standard } from '../../..';

const width = 180;
const height = buildNodeHeight(1);

export const EchoNodeDefinition: CodeckNodeDefinition = {
  name: 'obstacle',
  label: 'Obstacle',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width)
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        name: 'distance',
        width,
        position: 1,
      })
      .port.output.base(),
  ],
  code: ({ node, buildPinVarName, getConnectionInput }) => {
    const input = getConnectionInput('input') ?? '""';
    const output = buildPinVarName('output');

    return `let ${output} = JSON.stringify(${input});\n`;
  },
};
