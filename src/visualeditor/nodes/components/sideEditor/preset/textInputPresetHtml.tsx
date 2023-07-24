import React from 'react';
import { useNodeDataValue } from '../../../../hooks/useNodeData';
import { usePinDefinition } from '../../../../hooks/usePinDefinition';
import { useConnectionStore } from '../../../../store/connection';
import { BaseInputPresetProps } from '../../preset/types';
import { NodeInputTextHtml } from '../../input/TextHtml';
import { renderConnected } from '../../../../utils/standard';

export const TextInputPresetHtml: React.FC<BaseInputPresetProps> = React.memo(
    (props) => {
        const [text, setText] = useNodeDataValue(props.nodeId, props.name);
        const connected = useConnectionStore().checkIsConnected(
            props.nodeId,
            props.name
        );
        const { defaultValue } = usePinDefinition(props.nodeId, props.name) ?? {};

        
        return (
            <div className='border-b-[1px] pb-3 border-gray-300'>

                <div className="h-4 mb-3 w-full">
                    <div className="px-4 ">
                        <span className="text-gray-600 text-[11px] font-semibold truncate">{props.label} </span>
                    </div>
                </div>
                {connected ? renderConnected(props) : (
                    <NodeInputTextHtml
                        y={20}
                        value={text ?? defaultValue ?? ''}
                        onChange={setText}
                    />
                )}

            </div>
        );
    }
);
TextInputPresetHtml.displayName = 'TextInputPresetHtml';