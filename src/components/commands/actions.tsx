import React from 'react'
import { useNodes } from '@/hooks/useNodes'
import { entries, groupBy } from 'lodash-es'
import Highlighter from 'react-highlight-words'
import { Icons } from '@/visualeditor/utils/icons'


const  ActionsCommands:React.FC<{onNodeClick:(Codename:string) => void}> = React.memo(({onNodeClick}) => {
    const { searchValue, matchedNode } = useNodes()
    const handleNodeClick = (data:string)=>{
            onNodeClick(data)
    }
  return (
    <div className='flex flex-col overflow-hidden w-full mt-4 '>
    {Array.isArray(matchedNode) &&
        matchedNode.length > 0 &&
        entries(groupBy(matchedNode, 'category')).map(
            ([category, items]) => (
                <div key={category} title={category} className={"font-semibold w-full flex flex-col"}>
                    <h2 className='text-xs mb-3 ml-2'>{category}</h2>
                    <div className='flex flex-wrap w-full gap-2 '>
                        {items.map((item) => (
                            <div
                                key={`${category}-${item.name}`}
                                onClick={() => handleNodeClick(item.name)}
                                className={"relative tags outline-transparent text-sm font-normal border-0 rounded cursor-pointer text-center inline-block h-14 bg-transparent ml-0 mb-2 w-14 groupCommand-none hover:bg-blue-300/10"}
                            >
                                <span className="flex flex-wrap h-full justify-start items-center groupCommand-none" data-automationid="splitbuttonprimary">
                                    <span className="flex relative w-full h-full ">
                                        <span className="flex flex-1 flex-col items-center h-full max-w-full justify-center rounded groupCommand-none ">
                                            <span className="relative overflow-hidden fill-zinc-700 ml-0 flex-shrink-0 h-8 w-8 grid place-items-center rounded">
                                                <i data-icon-name="ArrowUpload" aria-hidden="true" className="w-6 h-6 flex items-center justify-center groupCommand-none">
                                                    {
                                                        Icons[item.name] ? Icons[item.name] : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z" /></svg>
                                                    }
                                                </i>
                                            </span>
                                            <span className='align-middle flex items-center font-normal text-[10px] flex-1 text-left text-gray-400 groupCommand-none w-full px-1'>
                                                <Highlighter
                                                    className='truncate w-full text-center'
                                                    searchWords={searchValue.split('')}
                                                    textToHighlight={item.label}
                                                />
                                            </span>
                                        </span>
                                    </span>
                                </span>

                            </div>
                        ))}
                    </div>
                </div>
            )
        )}
</div>
  )
}
)

export default ActionsCommands