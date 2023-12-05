import React from 'react';
import {NodeInputProps} from './Base';
import {NodeInputBaseHtml} from './BaseHtml';
import {sharedInputStyle} from './shared';

export interface NodeInputTextAreaProps extends NodeInputProps {
    row: number;
}

export const NodeInputTextAreaHtml: React.FC<NodeInputTextAreaProps> = React.memo(
    (props) => {
        return (
            <NodeInputBaseHtml
                {...props}
                height={props.row * 16}
                renderEditor={({width, height, value, setValue, handleBlur}) => (

                    <textarea
                        style={{
                            ...sharedInputStyle,
                        }}
                        autoFocus={true}
                        className="block p-2.5 w-full min-h-[70px] h-auto max-h-[250px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={value || "Enter the code"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                )}
            />
        );
    }
);
NodeInputTextAreaHtml.displayName = 'NodeInputTextAreaHtml';
