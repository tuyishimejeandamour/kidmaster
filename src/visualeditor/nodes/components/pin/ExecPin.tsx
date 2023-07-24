import Konva from 'konva';
import React, { useState } from 'react';
import { Circle, Group, Line, Rect } from 'react-konva';
import { color } from '../../../utils/color';
import { NODE_TITLE_HEIGHT } from '../../../utils/consts';

const pinSize = 8;

interface ExecPinProps {
  x: number;
  y: number;
  isInner?: boolean;
  connected: boolean;
  onConnectionStart: (e: Konva.KonvaEventObject<Event>) => void;
  onConnectionEnd: (e: Konva.KonvaEventObject<Event>) => void;
}

export const ExecPin: React.FC<ExecPinProps> = React.memo((props) => {
  const [strokeWidth, setStrokeWidth] = useState(2);
  return (
    <Group>
      <Rect
        x={props.x - 16}
        y={props.y - 16}
        width={32}
        height={NODE_TITLE_HEIGHT}
        fill='transparent'
        onMouseDown={props.onConnectionStart}
        onMouseUp={props.onConnectionEnd}
      />
      <Line
        x={props.x}
        y={props.y}
        points={[
          0,
          0,
          props.isInner ? -6 : -pinSize,
          props.isInner ? -6 : -pinSize,
          props.isInner ? -6 : -pinSize,
          props.isInner ? 6 : pinSize,
        ]}
        stroke={props.isInner ? '#0064ff' : "#eff3f4"}
        strokeWidth={strokeWidth}
        fill={props.connected ? props.isInner ? '#fff' : "#7d888b" : ''}
        closed={true}
        dash={!props.isInner ?[5, 2]:undefined}
        onMouseEnter={(e) => {
          setStrokeWidth(3);
        }}
        onMouseLeave={(e) => {
          setStrokeWidth(2);
        }}
        onMouseDown={props.onConnectionStart}
        onMouseUp={props.onConnectionEnd}
      />
    </Group>
  );
});
ExecPin.displayName = 'ExecPin';
