import React from 'react';
import {NodeInputProps} from './Base';
import {NodeInputBaseHtml} from './BaseHtml';
import {sharedInputStyle} from './shared';

export const NodeInputTextHtml: React.FC<NodeInputProps> = React.memo((props) => {
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
                        autoFocus={true}
                        placeholder={value}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <span className='w-6 h-8 flex items-center'>
            <span className='w-4 h-4  flex items-center hover:bg-slate-400 rounded-sm' onClick={handleBlur}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="currentcolor"
                   viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                  d="M5 11h14v2H5z"/></svg>
            </span>
          </span>
                </div>
            )}
        />
    );
});
NodeInputTextHtml.displayName = 'NodeInputTextHtml';
