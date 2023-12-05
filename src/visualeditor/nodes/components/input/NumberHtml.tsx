import React from 'react';
import {NodeInputProps} from './Base';
import {NodeInputBaseHtml} from './BaseHtml';
import {sharedInputStyle} from './shared';

export const NodeInputNumberHtml: React.FC<NodeInputProps> = React.memo((props) => {
    return (
        <NodeInputBaseHtml
            {...props}
            renderEditor={({width, height, value, setValue, handleBlur}) => (
                <div className='flex w-full'>
                    <input
                        style={{
                            ...sharedInputStyle
                        }}
                        className='pl-2 text-gray-800 text-[12px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding flex-1 p-0 h-8 mt-[1px]'
                        type="number"
                        autoFocus={true}
                        placeholder={value}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        />
    );
});
NodeInputNumberHtml.displayName = 'NodeInputNumberHtml';
