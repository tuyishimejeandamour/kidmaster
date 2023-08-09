import { useNodes } from "@/hooks/useNodes";
import { useUIStore } from "../..";
import { entries, groupBy } from "lodash-es";

export default function SidebarHeader() {
    const { search, searchValue,matchedNode } = useNodes()
    const {groupCommand,activeCategory,setActiveCategory} = useUIStore()
    
   const handleSearch = (value:string) => {
        search(value)
   }

    return (
        <div className="w-[calc(100%-20px)] sticky top-0 border-b border-b-slate-900/20  py-1 mb-1 pb-1 backdrop-blur-md flex h-8 flex-1 items-center justify-between z-20">
            <div>
                <ul className="grid grid-flow-col text-center text-gray-400  rounded-lg p-1">
                <li key={'all'} onClick={()=>setActiveCategory('all')} ><span className={`transition-all duration-300 ease-in-out flex text-center hover:cursor-pointer text-[11px] justify-center  ${ activeCategory == 'all'?'backdrop-blur-md bg-white/5 rounded-lg  shadow uppercase text-slate-50 ':''} px-2 py-[2px]`}>ALL</span></li>

                    {
                        entries(groupBy(matchedNode, 'category')).map(([key, value]) => (
                            
                                <li key={key} onClick={()=>setActiveCategory(key)}><span  className={`transition-all duration-300 ease-in-out text-[11px] flex text-center hover:cursor-pointer justify-center uppercase ${ activeCategory == key?'backdrop-blur-md rounded-lg shadow bg-white/5 text-slate-50':''} px-2 py-[2px]`}>{key}</span></li>
                            ))
                    }
                </ul>
            </div>
            <div className="flex">
                <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-1 left-1 flex items-center pl-0">
                    {
                                            groupCommand != "action" ?
                                                <span className='h-full text-center'>
                                                    {groupCommand == "variable" ?
                                                        (
                                                            <svg className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" style={{ borderRadius: 2 }}></polygon></svg>

                                                        ) :
                                                        (
                                                            <svg className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.6418 20 15.1681 19.5054 16.4381 18.6571L17.5476 20.3214C15.9602 21.3818 14.0523 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V13.5C22 15.433 20.433 17 18.5 17C17.2958 17 16.2336 16.3918 15.6038 15.4659C14.6942 16.4115 13.4158 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.1258 7 14.1647 7.37209 15.0005 8H17V13.5C17 14.3284 17.6716 15 18.5 15C19.3284 15 20 14.3284 20 13.5V12ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z"></path></svg>
                                                        )
                                                    }
                                                </span> :
                                                (
                                                    <svg className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z" /></svg>
                                                )
                                        }
                    </span>
                    <input type="text" name="q" className="py-[2px] text-sm text-white bg-gray-900/30 rounded-md pl-8 focus:outline-none" placeholder="Search..." autoComplete="off"
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    />
                </div>
                <div className="pl-3 hover:cursor-pointer w-6 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white/50 w-6 h-6" viewBox="0 0 24 24"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
                </div>
            </div>
        
        </div>
    )
}