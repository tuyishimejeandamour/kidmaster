import React from 'react';
import {useNodeInfo} from '../../hooks/useNodeInfo';
import {useConnectionStore} from '../../store/connection';
import {ExecPin} from '../components/pin/ExecPin';
import {Group} from 'react-konva';

export function useExecInRender(nodeId: string) {
    const {node, definition} = useNodeInfo(nodeId);

    if (!node || !definition) {
        return null;
    }

    return (
        <Group width={definition.width}>
            {definition.inputs.map((inputPin) => {
                /** */
                if (inputPin.type === "exec") {

                    return <ExecPin

                        key={nodeId + inputPin.name}
                        x={inputPin.position.x}
                        y={inputPin.position.y}
                        connected={useConnectionStore().checkIsConnected(nodeId, inputPin.name)}
                        onConnectionStart={(e) => {
                            e.cancelBubble = true;
                            useConnectionStore
                                .getState()
                                .startConnect(nodeId, inputPin.name, inputPin.type, 'in-out');
                        }}
                        onConnectionEnd={(e) => {
                            e.cancelBubble = true;
                            useConnectionStore
                                .getState()
                                .endConnect(nodeId, inputPin.name, inputPin.type, 'in-out');
                        }}
                    />
                }
            })}
        </Group>
    );
}
