import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { standard } from '../../..';

const width = defaultNodeWidth+20;
const height = buildNodeHeight(2);

export const LogNodeDefinition: CodeckNodeDefinition = {
  name: 'log',
  label: 'Display',
  type: 'function',
  component: BaseNode,

  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  ui: {
    backgroundColor: "#fff",


  },
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'message',
        width,
        position: 1,
      })
      .port.input.text(),
  ],
  outputs: [standard.execPinOutput(width)],
  code: ({ node, getConnectionInput }) => {
    const message =
      getConnectionInput('message') ?? JSON.stringify(node.data?.message ?? '');
    return `console.log(${message});\n`;
  },
};
