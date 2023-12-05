import {resetFlowEditorCursorStyle, setFlowEditorCursorStyle,} from '../../../utils/pointer-helper';
import React, {useCallback, useState} from 'react';
import {useEditValue} from '../../../hooks/useEditValue';

const defaultWidth = 80;
const defaultHeight = 16;

export interface NodeInputProps<T = any> {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    value: T;
    onChange: (text: T) => void;
}

interface NodeInputBaseProps<T = any> extends NodeInputProps<T> {
    renderEditor: (ctx: {
        width: number;
        height: number;
        handleBlur: () => void;
        value: T;
        setValue: (val: T) => void;
    }) => React.ReactNode;
}

export const NodeInputBaseHtml: React.FC<NodeInputBaseProps> = React.memo(
    (props) => {
        const [isEditing, setIsEditing] = useState(false);
        const {width = defaultWidth, height = defaultHeight} = props;
        const [value, setValue, submitValue] = useEditValue(
            props.value,
            props.onChange
        );

        const handleBlur = useCallback(() => {
            resetFlowEditorCursorStyle();
            submitValue();
            setIsEditing(false);
        }, [submitValue]);

        const handleMouseEnter = useCallback(() => {
            setFlowEditorCursorStyle('text');
        }, []);

        const handleMouseLeave = useCallback(() => {
            resetFlowEditorCursorStyle();
        }, []);

        return (
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='w-full min-h-[32px] h-auto flex px-4 justify-between mb-2'
            >
                {isEditing ? (
                    props.renderEditor({
                        width,
                        height,
                        value,
                        setValue,
                        handleBlur,
                    })
                ) : (
                    <div
                        className='flex w-full items-center border border-transparent hover:border-gray-400 hover:rounded-sm cursor-pointer'
                        onClick={() => setIsEditing(true)}>
                        <span
                            className='-ml-px pl-1  text-gray-700 flex align-top h-auto flex-1 overflow-y-auto scroll-design leading-[32px] text-[12px] max-h-[250px]'>{value || "No value yet"}</span>
                        <span className='w-6 h-8 flex items-center'>
              <span className='w-4 h-4  flex items-center hover:bg-slate-400 rounded-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="currentcolor"
                     viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                    d="M5 11h14v2H5z"/></svg>
              </span>
            </span>
                    </div>
                )}
            </div>
        );
    }
);
NodeInputBaseHtml.displayName = 'NodeInputBaseHtml';
