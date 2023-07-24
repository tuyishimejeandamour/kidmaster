import { NODE_TITLE_HEIGHT } from '../utils/consts';
import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useNodeInfo } from '../hooks/useNodeInfo';
import { CodeckNodeComponentProps } from '../store/node';
import { useUIStore } from '../store/ui';
import { color } from '../utils/color';
import { BaseNodeWrapper } from './BaseNodeWrapper';
import { usePinRender } from './hooks/usePinRender';
import { useExecInRender } from './hooks/useExecInRender';
import { useExecOutRender } from './hooks/useExecOutRender';

export const Bigend: React.FC<CodeckNodeComponentProps> = React.memo(
  (props) => {
    const nodeId = props.id;
    const { node, definition } = useNodeInfo(nodeId);
    const { selectedNodeIds } = useUIStore();
    const pinEl = usePinRender(nodeId);
    const InPin = useExecInRender(nodeId)
    const OutPin = useExecOutRender(nodeId)

    if (!node || !definition) {
      return null;
    }

    const { width, height, label } = definition;
    const { x, y } = node.position;

    return (
      <BaseNodeWrapper x={x} y={y} nodeId={nodeId}>
        <Rect
          width={width - 10}
          height={height}
          opacity={0.8}
          cornerRadius={18}
          shadowColor="#222124e0"
          shadowBlur={10}
          shadowOpacity={0.5}
          stroke="white"
          strokeWidth={selectedNodeIds.includes(nodeId) ? 4 : 0}
          fillAfterStrokeEnabled={true}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: width, y: height }}
          fillLinearGradientColorStops={[
            0,
            '#0f1216',
            1,
            '#1d2227',
          ]}
        />
        {InPin}

        <Text
          x={20}
          y={15}
          width={width - 30 * 2}
          height={NODE_TITLE_HEIGHT}
          align="left"
          verticalAlign="middle"
          fontSize={16}
          text={label}
          fill="white"
        />


        {pinEl}
        {OutPin}
      </BaseNodeWrapper>
    );
  }
);
Bigend.displayName = 'BaseNode';
