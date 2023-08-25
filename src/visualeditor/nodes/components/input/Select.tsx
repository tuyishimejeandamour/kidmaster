import React from 'react';
import { Html } from 'react-konva-utils';
import { NodeInputBase, NodeInputProps } from './Base';


const optionStyle: React.CSSProperties = {
  height: 16,
  lineHeight: '14px',
  fontSize: 10,
};

export interface NodeInputSelectProps extends NodeInputProps {
  options: { label: string; value: number | string }[];
}
export const NodeInputSelect: React.FC<NodeInputSelectProps> = React.memo(
  (props) => {
    const { options, ...others } = props;
    return (
      <NodeInputBase
        {...others}
        renderEditor={({ width, height, value, setValue, handleBlur }) => (
          <Html>
            <select
              style={{
                width,
                height,
              }}
              placeholder={value}
              value={value}
              onChange={(value: any) => setValue(value)}
              onBlur={handleBlur}
            >
              {options.map((opt, i) => (
                <option
                  key={`${i}-${opt.value}`}
                  value={opt.value}
                  style={optionStyle}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </Html>
        )}
      />
    );
  }
);
NodeInputSelect.displayName = 'NodeInputSelect';
