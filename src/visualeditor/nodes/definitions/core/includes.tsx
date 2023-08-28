import React from 'react';
import { CodeNodeDefinition } from '@/visualeditor';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, DEFAULT_NODE_WIDTH } from '@/visualeditor';
import { standard } from '../../..';

const width = DEFAULT_NODE_WIDTH;
const height = buildNodeHeight(3);

export const IncludesNodeDefinition: CodeNodeDefinition = {
  name: 'includes',
  label: 'Includes',
  type: 'call',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard
      .pin({
        name: 'data',
        width,
        position: 1,
      })
      .port.input.base(),
    standard
      .pin({
        name: 'item',
        width,
        position: 2,
      })
      .port.input.text(),
  ],
  outputs: [
    {
      ...standard
        .pin({
          name: 'has',
          width,
          position: 1,
        })
        .port.output.base(),
      code: ({ node, getConnectionInput }) => {
        const data = getConnectionInput('data') ?? '{}';
        const item = getConnectionInput('item') ?? node.data?.item ?? '""';

        return `${data}.includes(${item})`;
      },
    },
  ],
};
