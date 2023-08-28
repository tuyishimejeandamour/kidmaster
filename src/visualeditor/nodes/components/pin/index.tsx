import React from 'react';
import { Group } from 'react-konva';
import { useConnectionStore } from '../../../store/connection';
import { CodeNodePinDefinition } from '../../../store/node';
import { ExecPin } from './ExecPin';
import { PortPin } from './PortPin';

export const Pin: React.FC<{
  nodeId: string;
  definition: CodeNodePinDefinition;
  onConnectionStart: () => void;
  onConnectionEnd: () => void;
}> = React.memo((props) => {
  const { type, position, component, name } = props.definition;
  const connected = useConnectionStore().checkIsConnected(props.nodeId, name);

  return (
    <Group>
      {type === 'exec' ? (<ExecPin

        x={position.x}
        isInner={((name != "$pin_exec_out") && (name != "$pin_exec_in")) ? true : false}
        y={position.y}
        connected={connected}
        onConnectionStart={(e) => {
          e.cancelBubble = true;
          props.onConnectionStart();
        }}
        onConnectionEnd={(e) => {
          e.cancelBubble = true;
          props.onConnectionEnd();
        }}
      />) : (
        <PortPin
          x={position.x}
          y={position.y}
          connected={connected}
          onConnectionStart={(e) => {
            e.cancelBubble = true;
            props.onConnectionStart();
          }}
          onConnectionEnd={(e) => {
            e.cancelBubble = true;
            props.onConnectionEnd();
          }}
        />
      )}

      {component && (
        <Group x={position.x + 18} y={position.y - 6}>
          {React.createElement(component, {
            nodeId: props.nodeId,
          })}
        </Group>
      )}
    </Group>
  );
});
Pin.displayName = 'Pin';
