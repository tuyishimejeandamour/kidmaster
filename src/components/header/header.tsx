import Actions from "./actions"
import {useUIStore} from "@/visualeditor";
import {useLocation, useNavigate} from "react-router-dom";

function Header() {

    const {activeSpace, setActiveSpace} = useUIStore()
    const route = useNavigate();
    const onDashboard = useLocation().pathname.includes("editor")

    const handleFunctionClick = () => {
        setActiveSpace("main", "main")
    }
    return (
        <div className="h-11 drag-window rounded-t-sm flex items-center justify-between">

            <div className="flex items-center h-11">

                <div className="ml-3 w-11 h-11 un-drag-window hover:cursor-pointer flex items-center  select-none justify-center" onClick={() => {
                    route('/');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={"w-7 h-7 fill-gray-200"} viewBox="0 0 24 24">
                        <path
                            d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM6 7C5.44772 7 5 7.44772 5 8V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V8C19 7.44772 18.5523 7 18 7H13H11H6ZM2 10H0V16H2V10ZM22 10H24V16H22V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5Z"></path>
                    </svg>
                </div>


                {
                    onDashboard && (
                        <div className="min-w-[300px] un-drag-window w-fit h-11 pl-2 flex  items-center">
                            <div
                                className="rounded  h-7 my-2 flex px-2  items-center bg-[#66697277] backdrop-blur-md select-none ">
                                <span className="ml-2 text-white text-sm font-medium">
                                    {`Title bar`}
                                    <span className="text-[11px]">{' / '}</span>
                                    <span onClick={handleFunctionClick}
                                          className="text-blue-300 text-sm cursor-pointer">{"main"}</span>
                                    {activeSpace.name !== "main" ? (
                                        <>
                                            <span className="text-[11px]">{' / '}</span>
                                            <span
                                                className="text-blue-300 text-sm cursor-pointer">{activeSpace.name.split("up_")[1].split("_")[0]}</span>
                                        </>
                                    ) : null
                                    }
                                </span>
                                <span className="ml-2 text-slate-400 h-3  text-[10px] truncate"
                                      style={{lineHeight: "14px"}}>last edited 12:14</span>
                            </div>
                        </div>
                    )
                }
                {
                    !onDashboard && (
                        <p className={"text-slate-100 font-bold pl-3"}>Chime</p>
                    )
                }

            </div>

            <div className={"flex items-center"}>
                <div className="flex -space-x-4 mr-3 rtl:space-x-reverse">
                    <img className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800"
                         src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt=""/>
                    <img className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800"
                         src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt=""/>
                    <img className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800"
                         src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt=""/>
                    <a className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                       href="#">+4</a>
                </div>
                <Actions/>
            </div>

        </div>
    )

}


export default Header