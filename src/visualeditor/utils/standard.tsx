import React from 'react';
import { isEmpty } from 'lodash-es';
import { BaseNode } from '@/visualeditor';
import { OutputPinLabel, PinLabel } from '@/visualeditor';
import { SelectInputPresetProps } from '../nodes/components/preset/SelectInputPreset';
import {
  BooleanInputPreset,
  NumberInputPreset,
  SelectInputPreset,
  TextInputPreset,
} from '@/visualeditor';
import { CodeNodePinDefinition, CodeNodeDefinition } from '../store/node';
import { STANDARD_PIN_EXEC_IN, STANDARD_PIN_EXEC_OUT } from './consts';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
  defaultNodeWidth,
} from './size-helper';
import {
  TextAreaInputPreset,
  TextAreaInputPresetProps,
} from '../nodes/components/preset/TextAreaInputPreset';
import { TextInputPresetHtml } from '../nodes/components/sideEditor/preset/textInputPresetHtml';
import { TextAreaInputPresetHtml } from '../nodes/components/sideEditor/preset/TextAreaInputPresetHtml';
import { NumberInputPresetHtml } from '../nodes/components/sideEditor/preset/NumberInputPresetHtml';
import { SelectInputPresetHtml } from '../nodes/components/sideEditor/preset/SelectInputPresetHtml';
import { BooleanInputPresetHtml } from '../nodes/components/sideEditor/preset/BooleanInputPresetHtml';
import { useConnectionStore } from '@/visualeditor';
import { BaseInputPresetProps } from '../nodes/components/preset/types';

export function execPinInput(width: number): CodeNodePinDefinition {
  return {
    name: STANDARD_PIN_EXEC_IN,
    type: 'exec',
    position: {
      x: buildPinPosX(width, 'input'),
      y: buildPinPosY(0),
    },
  };
}


export function execPinOutput(width: number, height?: number): CodeNodePinDefinition {
  return {
    name: STANDARD_PIN_EXEC_OUT,
    type: 'exec',
    position: {
      x: buildPinPosX(width, 'output'),
      y: buildPinPosY(height || 0),
    },
  };
}

interface BasePinGenerateOptions {
  name: string;
  label?: string;
  width: number;
  position: number;
}

function portPin(
  options: BasePinGenerateOptions & {
    defaultValue?: CodeNodePinDefinition['defaultValue'];
  }
): {
  input: {
    base: () => CodeNodePinDefinition;
    text: () => CodeNodePinDefinition;
    textarea: (
      inputProps: TextAreaInputPresetProps['inputProps']
    ) => CodeNodePinDefinition;
    number: () => CodeNodePinDefinition;
    boolean: () => CodeNodePinDefinition;
    select: (
      selectOptions: SelectInputPresetProps['options']
    ) => CodeNodePinDefinition;
  };
  output: {
    base: () => CodeNodePinDefinition;
  };
} {
  const buildBaseDef = (
    direction: 'input' | 'output'
  ): CodeNodePinDefinition => ({
    name: options.name,
    type: 'port',
    position: {
      x: buildPinPosX(options.width, direction),
      y: buildPinPosY(options.position),
    },
    defaultValue: options.defaultValue,
  });

  return {
    input: {
      base: () => ({
        ...buildBaseDef('input'),
        component: () => {
          return <PinLabel label={options.label ?? options.name} />;
        },
      }),
      text: () => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <TextInputPreset
              nodeId={nodeId}
              key={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
        html: ({ nodeId }: { nodeId: string }) => {
          return (
            <TextInputPresetHtml
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />

          )
        }
      }),
      textarea: (inputProps) => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <TextAreaInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
              inputProps={inputProps}
            />
          );
        },
        html: ({ nodeId }) => {
          return (
            <TextAreaInputPresetHtml
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
              inputProps={inputProps}
            />
          )
        }
      }),
      number: () => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <NumberInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
        html: ({ nodeId }) => {
          return (
            <NumberInputPresetHtml
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
      }),
      boolean: () => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <BooleanInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
        html: ({ nodeId }) => {
          return (
            <BooleanInputPresetHtml
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
      }),
      select: (selectOptions: SelectInputPresetProps['options']) => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <SelectInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
              options={selectOptions}
            />
          );
        },
        html: ({ nodeId }) => {
          return (
            <SelectInputPresetHtml
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
              options={selectOptions}
            />
          );
        }
      }),
    },
    output: {
      base: () => ({
        ...buildBaseDef('output'),
        component: () => {
          return (
            <OutputPinLabel
              label={options.label ?? options.name}
              width={options.width / 2}
            />
          );
        },
      }),
    },
  };
}

function execPin(options: BasePinGenerateOptions): {
  input: () => CodeNodePinDefinition;
  output: () => CodeNodePinDefinition;
} {
  return {
    input: () => ({
      ...portPin(options).input.base(),
      type: 'exec',
    }),
    output: () => ({
      ...portPin(options).output.base(),
      type: 'exec',
    }),
  };
}

export function pin(options: BasePinGenerateOptions) {
  return {
    exec: execPin(options),
    port: portPin(options),
  };
}

export const objConstructNode = (
  options: Pick<CodeNodeDefinition, 'name' | 'label' | 'category'> &
    Partial<Pick<CodeNodeDefinition, 'width' | 'height'>> & {
      inputList: {
        name: string;
        label?: string;
        position?: number;
        required?: boolean;
        component?: CodeNodePinDefinition['component'];
      }[];
      constructWrapper?: string;
    }
): CodeNodeDefinition => {
  const width = options.width ?? defaultNodeWidth;
  const height =
    options.height ?? buildNodeHeight(Math.max(options.inputList.length, 1));

  return {
    name: options.name,
    label: options.label,
    type: 'function',
    component: BaseNode,
    width,
    height,
    category: options.category,
    inputs: [
      execPinInput(width),
      ...options.inputList.map((item, i) => ({
        name: item.name,
        type: 'port' as const,
        position: {
          x: buildPinPosX(width, 'input'),
          y: item.position ? buildPinPosY(item.position) : buildPinPosY(i + 1),
        },
        component:
          item.component ??
          (() => {
            return <PinLabel label={item.label ?? item.name} />;
          }),
      })),
    ],
    outputs: [
      execPinOutput(width),
      {
        name: 'payload',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'output'),
          y: buildPinPosY(1),
        },
        component: () => {
          return <OutputPinLabel label="payload" width={width / 2} />;
        },
      },
    ],
    code: ({ node, getConnectionInput, buildPinVarName }) => {
      const payload = buildPinVarName('payload');

      const getInput = (name: string) => {
        return (
          getConnectionInput(name) ??
          JSON.stringify(node.data?.[name]) ??
          undefined
        );
      };

      const invalidInput = options.inputList
        .filter((input) => input.required === true)
        .filter((item) => {
          const d = getInput(item.name);
          return isEmpty(d) || d === '""';
        });
      if (invalidInput.length > 0) {
        return `// [${options.label}] required params: ${invalidInput
          .map((item) => item.label ?? item.name)
          .join(', ')}\n`;
      }

      const inputVarList = options.inputList.map<[string, string]>((input) => [
        input.name,
        getInput(input.name),
      ]);


      const body = inputVarList
        .filter((v) => v[1] !== undefined)
        .map((v) => `${v[0]}: ${v[1]}`)
        .join(', ');

      if (options.constructWrapper) {
        return `const ${payload} = ${options.constructWrapper}({ ${body} });\n`;
      } else {
        return `const ${payload} = { ${body} };\n`;
      }
    },
  };
};

export const objDeconstructNode = (
  options: Pick<CodeNodeDefinition, 'name' | 'label' | 'category'> &
    Partial<Pick<CodeNodeDefinition, 'width'>> & {
      outputList: {
        name: string;
        label?: string;
      }[];
    }
): CodeNodeDefinition => {
  const width = options.width ?? defaultNodeWidth;
  const height = buildNodeHeight(Math.max(options.outputList.length, 1));

  return {
    name: options.name,
    label: options.label,
    type: 'function',
    component: BaseNode,
    width,
    height,
    category: options.category,
    inputs: [
      execPinInput(width),
      {
        name: 'payload',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'input'),
          y: buildPinPosY(1),
        },
        component: () => {
          return <PinLabel label="payload" />;
        },
      },
    ],
    outputs: [
      execPinOutput(width),
      ...options.outputList.map((item, i) => ({
        name: item.name,
        type: 'port' as const,
        position: {
          x: buildPinPosX(width, 'output'),
          y: buildPinPosY(i + 1),
        },
        component: () => {
          return (
            <OutputPinLabel label={item.label ?? item.name} width={width / 2} />
          );
        },
      })),
    ],
    code: ({ getConnectionInput, buildPinVarName }) => {
      const vars = options.outputList
        .map((item) => `${item.name}: ${buildPinVarName(item.name)}`)
        .join(',\n  ');
      const payload = getConnectionInput('payload');

      if (!payload) {
        return '// require input payload';
      }

      return `const {
  ${vars}
} = ${payload};\n`;
    },
  };
};


/**
 * rendering connected node is connected
 */

export const renderConnected = (node: BaseInputPresetProps) => {

  const handleClick = () => {

  }
  const handleRemove = () => {
    useConnectionStore.getState().removeConnectionByPinName(node.nodeId, node.label)

  }

  return (
    <div className='w-full px-4'>
      <div className='flex w-full items-center border border-blue-400 rounded-lg cursor-pointer' onClick={() => handleClick()}>
        <span className='-ml-px pl-4  text-gray-700 flex align-top h-auto flex-1 overflow-y-auto scroll-design leading-[32px] text-[12px] max-h-[250px]'>{"Connected"}</span>
        <span className='w-6 h-8 flex items-center' onClick={handleRemove}>
          <span className='w-4 h-4  flex items-center hover:bg-red-500 rounded-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black hover:text-white" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
          </span>
        </span>
      </div>
    </div>
  )
}
