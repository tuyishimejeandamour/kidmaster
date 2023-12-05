import React from 'react';
import {useNodeDataValue} from '../../../../hooks/useNodeData';
import {useConnectionStore} from '../../../../store/connection';
import {BaseInputPresetProps} from '../../preset/types';
import {usePinDefinition} from '../../../../hooks/usePinDefinition';
import {NodeInputBooleanHtml} from '../../input/BooleanHtml';
import {renderConnected} from '../../../../utils/standard';

export const BooleanInputPresetHtml: React.FC<BaseInputPresetProps> = React.memo(
    (props) => {
        const [val, setVal] = useNodeDataValue(props.nodeId, props.name);
        const connected = useConnectionStore().checkIsConnected(
            props.nodeId,
            props.name
        );
        const {defaultValue} = usePinDefinition(props.nodeId, props.name) ?? {};

        return (
            <div className='border-b-[1px] pb-3 border-gray-300'>

                <div className="h-4 mb-3 w-full">
                    <div className="px-4 ">
                        <span className="text-gray-600 text-[11px] font-semibold truncate">{props.label} </span>
                    </div>
                </div>
                {connected ? renderConnected(props) : (
                    <NodeInputBooleanHtml
                        y={20}
                        value={val ?? defaultValue ?? false}
                        onChange={setVal}
                    />
                )}
            </div>
        );
    }
);
BooleanInputPresetHtml.displayName = 'BooleanInputPresetHtml';
