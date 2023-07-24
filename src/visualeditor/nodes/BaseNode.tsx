import { NODE_TITLE_HEIGHT } from '../utils/consts';
import React from 'react';
import { Rect, Text,Image } from 'react-konva';
import { useNodeInfo } from '../hooks/useNodeInfo';
import { CodeckNodeComponentProps } from '../store/node';
import { useUIStore } from '../store/ui';
import { BgColor, color } from '../utils/color';
import { BaseNodeWrapper } from './BaseNodeWrapper';
import { usePinRender } from './hooks/usePinRender';
import { useExecInRender } from './hooks/useExecInRender';
import { useExecOutRender } from './hooks/useExecOutRender';
// import background from '../../assets/background.png'
// import Konva from 'konva';

export const BaseNode: React.FC<CodeckNodeComponentProps> = React.memo(
  (props) => {
    const nodeId = props.id;
    const { node, definition } = useNodeInfo(nodeId);
    const { selectedNodeIds } = useUIStore();
    const pinEl = usePinRender(nodeId);
    // const InPin = useExecInRender(nodeId)
    // const OutPin = useExecOutRender(nodeId)
    

    if (!node || !definition) {
      return null;
    }

    const { width, height, label } = definition;
    const { x, y } = node.position;
    const type = definition.type as BgColor

    return (
      <BaseNodeWrapper x={x} y={y} nodeId={nodeId}>
        <Rect
          width={width}
          height={height}
          opacity={0.6}
          cornerRadius={5}
          shadowColor="#222124e0"
          shadowBlur={20}
          shadowOpacity={1}
          stroke={"#3b82f6"}
          strokeWidth={selectedNodeIds.includes(nodeId) ? 4 : 0}
          fillAfterStrokeEnabled={true}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: width, y: height }}
          fillLinearGradientColorStops={[
            0,
            color.nodeBoxGradient[type].start,
            1,
            color.nodeBoxGradient[type].end,
          ]}
        />
        {/* <Image
          x={100}
          y={100}
          width={300}
          height={300}
          image={background}
          filters={[Konva.Filters.Blur, Konva.Filters.Noise]}
          blurRadius={10}
          noise={1}
        /> */}
        <Rect
          width={width}
          height={NODE_TITLE_HEIGHT}
          fill={"transparent"}
          cornerRadius={[5, 5, 0, 0]}
        />
        {/* {InPin} */}
        <Text
          x={30}
          y={0}
          width={width - 30 * 2}
          height={NODE_TITLE_HEIGHT}
          align="left"
          verticalAlign="middle"
          fontSize={16}
          text={label}
          fill={color.node[definition.type]}
        />
        <Rect
          x={4}
          y={NODE_TITLE_HEIGHT}
          width={width - 8}
          opacity={0.7}
          height={height - NODE_TITLE_HEIGHT - 4}
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: width - 8, y: height - NODE_TITLE_HEIGHT - 4 }}
          fillLinearGradientColorStops={[0, '#e5e5e5', 1, '#f8fffd']}
          cornerRadius={5}
        />
        {pinEl}

        {/* {OutPin} */}
      </BaseNodeWrapper>
    );
  }
);
BaseNode.displayName = 'BaseNode';
