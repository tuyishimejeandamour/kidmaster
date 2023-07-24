import React from 'react'

const Action = ({title,onClick,children}:{title:string,onClick:Function,children:any})=> {

    const handleClick=()=>{
        onClick()
    }
    return (
        <button type="button" onClick={handleClick}  role="tab" aria-selected="false" id="Pivot37-Tab1" className="relative outline-transparent text-sm font-normal border-0 rounded cursor-pointer text-center inline-block h-14 bg-transparent ml-0 mb-2 w-14 select-none hover:bg-gray-400/20" name="My Media" data-content="My Media xx" data-is-focusable="true" tabIndex={-1}>
            <span className="flex flex-wrap h-full justify-start items-center select-none" data-automationid="splitbuttonprimary">
                <span className="flex relative w-full h-full ">
                    <span className="flex flex-1 flex-col items-center h-full max-w-full justify-center rounded select-none ">
                        <span className="relative overflow-hidden fill-zinc-700 ml-0 flex-shrink-0 h-8 w-8 grid place-items-center rounded">
                            <i data-icon-name="ArrowUpload" aria-hidden="true" className="w-5 h-5 inline-block select-none">
                                {children}
                            </i>
                        </span>
                        <span className="inline-block align-top font-normal text-[10px] flex-1 text-left text-gray-800 select-none">{title}</span>
                    </span>
                </span>
            </span>
        </button>
    )
}

export default Action