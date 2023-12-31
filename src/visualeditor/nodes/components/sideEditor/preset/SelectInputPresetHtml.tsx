import React from 'react';
import {useNodeDataValue} from '../../../../hooks/useNodeData';
import {usePinDefinition} from '../../../../hooks/usePinDefinition';
import {useConnectionStore} from '../../../../store/connection';
import {NodeInputSelectProps} from '../../input/Select';
import {BaseInputPresetProps} from '../../preset/types';
import {NodeInputSelectHtml} from '../../input/SelectHtml';
import {renderConnected} from '../../../../utils/standard';

export interface SelectInputPresetProps extends BaseInputPresetProps {
    options: NodeInputSelectProps['options'];
}

export const SelectInputPresetHtml: React.FC<SelectInputPresetProps> = React.memo(
    (props) => {
        const [text, setText] = useNodeDataValue(props.nodeId, props.name);
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
                    <NodeInputSelectHtml
                        y={20}
                        value={text ?? defaultValue ?? ''}
                        onChange={setText}
                        options={props.options}
                    />
                )}
            </div>
        );
    }
);
SelectInputPresetHtml.displayName = 'SelectInputPresetHtml';
