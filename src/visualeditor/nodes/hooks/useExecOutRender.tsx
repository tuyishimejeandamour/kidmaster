import React from 'react';
import { useNodeInfo } from '../../hooks/useNodeInfo';
import { useConnectionStore } from '../../store/connection';
import { ExecPin } from '../components/pin/ExecPin';
import { Group } from 'react-konva';

export function useExecOutRender(nodeId: string) {
  const { node, definition } = useNodeInfo(nodeId);

  if (!node || !definition) {
    return null;
  }
  return (
    <Group>
      {definition.outputs.map((outputPin) => {
        if(outputPin.type === "exec"){
            return  <ExecPin
            key={nodeId + outputPin.name}
            x={outputPin.position.x}
            isInner={outputPin.name != "$pin_exec_out"?true:false}
            y={outputPin.position.y}
            connected={useConnectionStore().checkIsConnected(nodeId, outputPin.name)}
            onConnectionStart={(e) => {
              e.cancelBubble = true;
              useConnectionStore
              .getState()
              .startConnect(nodeId, outputPin.name, outputPin.type, 'out-in');
            }}
            onConnectionEnd={(e) => {
              e.cancelBubble = true;
              useConnectionStore
              .getState()
              .endConnect(nodeId, outputPin.name, outputPin.type, 'out-in');
            }}
          />
        }else{
          return null
        }
        
        })}
    </Group>
  );
}
