import { useOSInfo } from "../../hooks/osInfo"
import Actions from "./actions"
import { useUIStore } from "../../visualeditor";
import { useAppStore } from "../../store/app";
import { useEffect } from "react";
interface IProps {
    toggleSidebar: Function;
    sideBarOpened: boolean
}
function Header() {

    const { activeSpace, setActiveSpace } = useUIStore()
    const { showSidebar, onDashboard, setOnDashboard, setshowSidebar } = useAppStore()
    const { compareOS } = useOSInfo()


    const handleFunctionClick = () => {
        setActiveSpace("main", "main")
    }
    useEffect(() => {

    }, [])
    return (
        <div data-tauri-drag-region className="h-11 rounded-t-sm flex items-center justify-between">

            <div className="flex items-center h-11">
                {
                    showSidebar && !onDashboard && (
                        <div onClick={() => setshowSidebar(!showSidebar)} className="w-11 h-11 flex items-center bg-white/5 backdrop-blur-xl hover:cursor-pointer hover:bg-gray-600/50 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  text-white" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" /></svg>
                        </div>
                    )
                }
                {
                    !onDashboard && (
                        <div className="ml-3 w-11 h-11 flex items-center  select-none justify-center" data-tauri-drag-region onClick={e => {
                            setOnDashboard(true)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  fill-gray-700/50" viewBox="0 0 24 24"><path d="M13 4.05493C17.5 4.55237 21 8.36745 21 13V22H3V13C3 8.36745 6.50005 4.55237 11 4.05493V1H13V4.05493ZM19 20V13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13V20H19ZM12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18ZM12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16ZM12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14Z"></path></svg>
                        </div>
                    )
                }

                {
                    !onDashboard && (
                        <div className="min-w-[300px] w-fit h-11 pl-3 flex  items-center" data-tauri-drag-region>
                            <div className="rounded  h-7 my-2 flex px-2  items-center bg-[#66697277] backdrop-blur-md select-none ">
                                <span className="ml-2 text-white text-sm font-medium">
                                    {`Titlebar`}
                                    <span className="text-[11px]">{' / '}</span>
                                    <span onClick={handleFunctionClick} className="text-blue-300 text-sm cursor-pointer">{"main"}</span>
                                    {activeSpace.name !== "main" ? (
                                        <>
                                            <span className="text-[11px]">{' / '}</span>
                                            <span className="text-blue-300 text-sm cursor-pointer">{activeSpace.name}</span>
                                        </>
                                    ) : null
                                    }
                                </span>
                                <span className="ml-2 text-slate-400 h-3  text-[10px] truncate" style={{ lineHeight: "14px" }}>last edited 12:14</span>
                            </div>
                        </div>
                    )
                }

            </div>
            {
                !compareOS("linux") &&
                <div data-tauri-drag-region>
                    <Actions />
                </div>
            }
        </div>
    )

}


export default Header