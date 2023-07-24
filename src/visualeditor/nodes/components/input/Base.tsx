import {
  resetFlowEditorCursorStyle,
  setFlowEditorCursorStyle,
} from '../../../utils/pointer-helper';
import React, { useCallback } from 'react';
import { Group, Text } from 'react-konva';
import { useEditValue } from '../../../hooks/useEditValue';
import { defaultNodeWidth } from '../../../utils/size-helper';

const defaultWidth = defaultNodeWidth - 8;
const defaultHeight = 16;

export interface NodeInputProps<T = any> {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value: T;
  onChange: (text: T) => void;
}

interface NodeInputBaseProps<T = any> extends NodeInputProps<T> {
  renderEditor: (ctx: {
    width: number;
    height: number;
    handleBlur: () => void;
    value: T;
    setValue: (val: T) => void;
  }) => React.ReactNode;
}
export const NodeInputBase: React.FC<NodeInputBaseProps> = React.memo(
  (props) => {
    const { x, y, width = defaultWidth, height = defaultHeight } = props;
    const [value] = useEditValue(
      props.value,
      props.onChange
    );

    const handleMouseEnter = useCallback(() => {
      setFlowEditorCursorStyle('text');
    }, []);

    const handleMouseLeave = useCallback(() => {
      resetFlowEditorCursorStyle();
    }, []);

    return (
      <Group
        x={x}
        y={y}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <Rect width={width} height={height} stroke="white" strokeWidth={1} /> */}
        <Text
          
          x={2}
          y={2}
          width={width}
          height={height}
          fill="#505360"
          text={value}
        />

      </Group>
    );
  }
);
NodeInputBase.displayName = 'NodeInputBase';
