import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../../hooks/useNodeData';
import { usePinDefinition } from '../../../../hooks/usePinDefinition';
import { useConnectionStore } from '../../../../store/connection';
import { NodeInputNumber } from '../../input/Number';
import { PinLabel } from '../../pin/Label';
import { BaseInputPresetProps } from '../../preset/types';
import { NodeInputNumberHtml } from '../../input/NumberHtml';
import { renderConnected } from '../../../../utils/standard';

export const NumberInputPresetHtml: React.FC<BaseInputPresetProps> = React.memo(
  (props) => {
    const [text = 0, setText] = useNodeDataValue(props.nodeId, props.name);
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
          <NodeInputNumberHtml
            y={20}
            value={Number(text) ?? defaultValue ?? 0}
            onChange={(val) => setText(Number(val))}
          />
        )}
      </div>
    );
  }
);
NumberInputPresetHtml.displayName = 'NumberInputPresetHtml';
