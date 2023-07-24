
import React from 'react';


export interface NodeInputProps<T = any, Q = "x" | "y" | "width" | "height" | "radius"> {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: T;
  onChange: (text: T, which: Q) => void;
}
//create a function that return rounded decimal number of 2 digits
const round = (num: number | undefined) => {
  if (!num) return 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const PositionsBase: React.FC<NodeInputProps> = React.memo(
  (props) => {

    return (
      <div className="w-full h-full bg-white">
        <div className="border-b-[1px] pb-3 border-gray-300">
          <div className="h-8 py-1  mb-3 w-full">
            <div className="px-4 ">
              <div className="border-b py-2 cursor-pointer">
                <span className="text-gray-600 font-s truncate">Positions</span>
              </div>
            </div>
          </div>
          <div className="w-full h-8 flex px-4 justify-between mb-1" >
            <label className="flex w-1/2 border border-transparent  hover:border-gray-400 hover:rounded-sm" aria-label="X">
              <span className="-ml-px  text-gray-600 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">X</span>
              <input autoComplete="new-password" spellCheck="false" onChange={(e) => props.onChange(e.target.value, "x")} className="pl-0 inputhover text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" dir="auto" defaultValue={round(props.x)} />
            </label>
            <label className="flex 1/2 border border-transparent  hover:border-gray-400 hover:rounded-sm" aw-ria-label="Y">
              <span className="-ml-px  text-gray-600 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">Y</span>
              <input autoComplete="new-password" spellCheck="false" onChange={(e) => props.onChange(e.target.value, "y")} className=" pl-0 inputhover text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" dir="auto" defaultValue={round(props.y)} />
            </label>
          </div>
          <div className="w-full h-8 flex px-4 justify-between mb-1">
            <label className="flex w-1/2 border border-transparent  hover:border-gray-400 hover:rounded-sm " aria-label="Width">
              <span className="-ml-px  text-gray-600 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center">W</span>
              <input autoComplete="new-password" spellCheck="false" onChange={(e) => props.onChange(e.target.value, "width")} className=" pl-0 inputhover text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" data-testid="transform-width" dir="auto" defaultValue={props.width} />
            </label>
            <label className="flex 1/2 border border-transparent  hover:border-gray-400 hover:rounded-sm" aria-label="Height">
              <span className="-ml-px  text-gray-600 block align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">H</span>
              <input autoComplete="new-password" spellCheck="false" onChange={(e) => props.onChange(e.target.value, "height")} className=" pl-0 inputhover text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" data-testid="transform-height" dir="auto" defaultValue={props.height} />
            </label>

          </div>
          <div className="w-full h-8 flex px-4 justify-between mb-1">
            <label className="flex 1/2 border border-transparent  hover:border-gray-400 hover:rounded-sm" data-tooltip-type="text" data-tooltip="Rotation" aria-label="Rotation">
              <span className="-ml-px  text-gray-600 flex items-center justify-center align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">
                <svg className="svg" width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v8h8V7H5c0-2.21-1.79-4-4-4V0H0zm1 4v3h3c0-1.657-1.343-3-3-3z" fillRule="evenodd" fillOpacity="1" fill="#000" stroke="none"></path></svg>
              </span>
              <input autoComplete="new-password" spellCheck="false" className="pl-0 text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" dir="auto" defaultValue="0°" />
            </label>
            <label className="flex 1/2 border border-transparent  hover:border-gray-400 hover:rounded-sm" data-tooltip-type="text" data-tooltip="Corner radius" aria-label="Corner radius">
              <span className="-ml-px  text-gray-600 flex items-center justify-center align-top h-8 w-8 flex-[32px] leading-[32px] text-[11px] text-center ">
                <svg className="svg" width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><path d="M9 1H5C2.79 1 1 2.79 1 5v4H0V5c0-2.761 2.239-5 5-5h4v1z" fillRule="nonzero" fillOpacity="1" fill="#000" stroke="none"></path></svg>
              </span>
              <input autoComplete="new-password" spellCheck="false" className="pl-0 text-gray-600 text-[11px] ml-0 border-l-0 rounded-sm cursor-default bg-clip-padding w-full p-0 h-7 mt-[1px]" dir="auto" defaultValue="Mixed" />
            </label>
            <span tabIndex={0} className="text-gray-600 hover:cursor-pointer hover:bg-gray-200 rounded-md flex items-center justify-center h-8 w-8" data-tooltip-type="text" data-tooltip="Independent corners">
              <svg className="svg" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.5C2 3.12 3.12 2 4.5 2H6v1H4.5C3.672 3 3 3.672 3 4.5V6H2V4.5zM10 2h1.5C12.88 2 14 3.12 14 4.5V6h-1V4.5c0-.828-.672-1.5-1.5-1.5H10V2zm-7 8v1.5c0 .828.672 1.5 1.5 1.5H6v1H4.5C3.12 14 2 12.88 2 11.5V10h1zm11 0v1.5c0 1.38-1.12 2.5-2.5 2.5H10v-1h1.5c.828 0 1.5-.672 1.5-1.5V10h1z" fillRule="evenodd" fillOpacity="1" fill="#000" stroke="none"></path></svg>
            </span>
          </div>
        </div>
      </div>
    );
  }
);
PositionsBase.displayName = 'positionBase';
