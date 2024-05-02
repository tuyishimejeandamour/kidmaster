import React, {useState} from 'react';
import {CodeNodeDefinition} from "@/visualeditor";
import {SketchPicker} from "react-color";


export interface ColorInputProps {
    definition?: CodeNodeDefinition,
}


export const ColorEditorBase: React.FC<ColorInputProps> = React.memo(
    (props) => {

        const [color, setColor] = useState("lightblue");
        const [hidden, setHidden] = useState(false);
        const onChange = (value: string, type: string) => {
            if (type === "bg") {
                console.log("bg");
            }
            if (type === "h") {
                console.log("h");
            }
        }

        const pickerStyle = {
            default: {
                picker: {
                    position: "absolute",
                    bottom: "30px",
                    left: "100px"
                }
            }
        };
        return (
            <div className="w-full h-full bg-transparent">
                <div className=" pb-3 ">
                    <div className="h-8 py-1  mb-7 w-full">
                        <div className="px-4 ">
                            <div className="border-b py-2 cursor-pointer">
                                <span className="text-gray-200 font-s truncate">Coloring</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-8 flex px-4 justify-between mb-1">
                        <label className="flex w-1/3 justify-start " aria-label="X">
                            <span
                                className="-ml-px  text-gray-200 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] ">background</span>
                        </label>
                        <label
                            className="flex flex-1   border border-transparent  hover:border-gray-400 hover:rounded-sm"
                            aw-ria-label="Y">
                            <span
                                className="-ml-px flex  text-gray-200 justify-center  items-center h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">
                                <span className='bg-slate-100 w-5 h-5 inline-block rounded-sm cursor-pointer'
                                      style={{background: color}} onClick={() => setHidden(!hidden)}
                                />
                            </span>
                            <input autoComplete="new-password" spellCheck="false"
                                   onChange={(e) => onChange(e.target.value, "bg")}
                                   className=" pl-0 input-hover bg-transparent text-gray-200 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]"
                                   dir="auto" defaultValue={props.definition?.ui?.backgroundColor}/>
                        </label>
                        {hidden && (
                            <SketchPicker
                                //styles={pickerStyle}
                                disableAlpha={true}

                                color={color}
                                onChange={(updatedColor) => setColor(updatedColor.hex)}
                            />
                        )}
                    </div>
                    {
                        props.definition?.ui?.headerColor &&

                        <div className="w-full h-8 flex px-4 justify-between mb-2">
                            <label className="flex w-1/3 justify-start " aria-label="Width">
                                <span
                                    className="-ml-px  text-gray-200 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px]">header</span>
                            </label>
                            <label
                                className="flex flex-1 border border-transparent  hover:border-gray-400 hover:rounded-sm"
                                aria-label="Height">
                                <span
                                    className="-ml-px flex  text-gray-200 justify-center  items-center align-top h-8 w-8  leading-[32px]"
                                >
                                <span className='bg-slate-100 w-5 h-5 inline-block rounded-sm cursor-pointer'/>
                                </span>
                                <input autoComplete="new-password" spellCheck="false"
                                       onChange={(e) => onChange(e.target.value, "h")}
                                       className=" pl-0 input-hover text-gray-200 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-transparent bg-clip-padding w-full p-0 h-7 mt-[1px]"
                                       data-testid="transform-height" dir="auto"
                                       value={props.definition?.ui?.headerColor}/>
                            </label>

                        </div>
                    }
                </div>
            </div>
        );
    }
);
ColorEditorBase.displayName = 'colorEditorBase';
