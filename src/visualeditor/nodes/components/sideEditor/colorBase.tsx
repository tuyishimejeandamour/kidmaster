
import React from 'react';


export interface ColorInputProps<T = string, Q = "bg" | "h"> {
    background: string,
    header?: string,
    onChange: (text: T, which: Q) => void;
}


export const ColorEditorBase: React.FC<ColorInputProps> = React.memo(
    (props) => {

        return (
            <div className="w-full h-full bg-white">
                <div className=" pb-3 ">
                    <div className="h-8 py-1  mb-7 w-full">
                        <div className="px-4 ">
                            <div className="border-b py-2 cursor-pointer">
                                <span className="text-gray-600 font-s truncate">Coloring</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-8 flex px-4 justify-between mb-1" >
                        <label className="flex w-1/3 justify-start " aria-label="X">
                            <span className="-ml-px  text-gray-600 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] ">background</span>
                        </label>
                        <label className="flex flex-1   border border-transparent  hover:border-gray-400 hover:rounded-sm" aw-ria-label="Y">
                            <span className="-ml-px flex  text-gray-600 justify-center  items-center h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">
                                <span className='bg-slate-400 w-5 h-5 inline-block rounded-sm cursor-pointer' />
                            </span>

                            <input autoComplete="new-password" spellCheck="false" onChange={(e) => props.onChange(e.target.value, "bg")} className=" pl-0 inputhover text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" dir="auto" defaultValue={props.background} />
                        </label>
                    </div>
                    {
                        props.header &&

                        <div className="w-full h-8 flex px-4 justify-between mb-2">
                            <label className="flex w-1/3 justify-start " aria-label="Width">
                                <span className="-ml-px  text-gray-600 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px]">header</span>
                            </label>
                            <label className="flex flex-1 border border-transparent  hover:border-gray-400 hover:rounded-sm" aria-label="Height">
                                <span className="-ml-px flex  text-gray-600 justify-center  items-center align-top h-8 w-8  leading-[32px]">
                                <span className='bg-slate-400 w-5 h-5 inline-block rounded-sm cursor-pointer' />
                                </span>
                                <input autoComplete="new-password" spellCheck="false" onChange={(e) => props.onChange(e.target.value, "h")} className=" pl-0 inputhover text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" data-testid="transform-height" dir="auto" value={props.header} />
                            </label>

                        </div>
                    }
                </div>
            </div>
        );
    }
);
ColorEditorBase.displayName = 'colorEditorBase';
