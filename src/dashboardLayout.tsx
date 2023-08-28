import React from "react";
import {useAppStore} from "@/store/app";
import {useNavigate} from "react-router-dom";

export default function DashboardLayout({children}:{children:React.ReactNode}){
    const { setOnDashboard } = useAppStore()
    const router = useNavigate()
    return (
        <div className='max-w-screen-2xl flex w-full h-full'>
            <div className='w-20 ml-3 flex items-center justify-between flex-col'>
                <div className='w-full items-center flex flex-col'>
                    <button type="button" onClick={() => {router('/');setOnDashboard(true)}} role="tab" aria-selected="false" id="Pivot37-Tab1" className="relative outline-transparent text-sm font-normal border-0 rounded-2xl cursor-pointer text-center inline-block h-14 bg-transparent ml-0 mb-2 w-14 select-none hover:bg-white" name="My Media" data-content="My Media xx" data-is-focusable="true" tabIndex={-1}>
            <span className="flex flex-wrap h-full justify-start items-center select-none" data-automationid="splitbuttonprimary">
              <span className="flex relative w-full h-full ">
                <span className="flex flex-1 flex-col items-center h-full max-w-full justify-center rounded select-none ">
                  <span className="relative overflow-hidden fill-zinc-700 ml-0 flex-shrink-0 h-8 w-8 grid place-items-center rounded">
                    <i data-icon-name="ArrowUpload" aria-hidden="true" className="w-6 h-6 inline-block select-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  fill-gray-800" viewBox="0 0 24 24"><path d="M13 4.05493C17.5 4.55237 21 8.36745 21 13V22H3V13C3 8.36745 6.50005 4.55237 11 4.05493V1H13V4.05493ZM19 20V13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13V20H19ZM12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18ZM12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16ZM12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14Z"></path></svg>
                    </i>
                  </span>
                </span>
              </span>
            </span>
                    </button>
                    <button type="button" onClick={() => {router('/editor');setOnDashboard(false)}} role="tab" aria-selected="false" id="Pivot37-Tab1" className="relative outline-transparent text-sm font-normal border-0 rounded-2xl cursor-pointer text-center inline-block h-14 bg-transparent ml-0 mb-2 w-14 select-none hover:bg-white" name="My Media" data-content="My Media xx" data-is-focusable="true" tabIndex={-1}>
            <span className="flex flex-wrap h-full justify-start items-center select-none" data-automationid="splitbuttonprimary">
              <span className="flex relative w-full h-full ">
                <span className="flex flex-1 flex-col items-center h-full max-w-full justify-center rounded select-none ">
                  <span className="relative overflow-hidden fill-zinc-700 ml-0 flex-shrink-0 h-8 w-8 grid place-items-center rounded">
                    <i data-icon-name="ArrowUpload" aria-hidden="true" className="w-6 h-6 inline-block select-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-6 h-6 fill-gray-800" viewBox="0 0 24 24" width="24" height="24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" ></path></svg>
                    </i>
                  </span>
                </span>
              </span>
            </span>
                    </button>
                </div>
                <button type="button" onClick={() =>{router('/settings'); setOnDashboard(true)}} role="tab" aria-selected="false" id="Pivot37-Tab1" className="relative outline-transparent text-sm font-normal border-0 rounded-2xl cursor-pointer text-center inline-block h-14 bg-transparent ml-0 mb-2 w-14 select-none hover:bg-white" name="My Media" data-content="My Media xx" data-is-focusable="true" tabIndex={-1}>
          <span className="flex flex-wrap h-full justify-start items-center select-none" data-automationid="splitbuttonprimary">
            <span className="flex relative w-full h-full ">
              <span className="flex flex-1 flex-col items-center h-full max-w-full justify-center rounded select-none ">
                <span className="relative overflow-hidden fill-zinc-700 ml-0 flex-shrink-0 h-8 w-8 grid place-items-center rounded">
                  <i data-icon-name="ArrowUpload" aria-hidden="true" className="w-6 h-6 inline-block select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-6 h-6  fill-gray-800" viewBox="0 0 24 24"><path d="M8.68735 4.00008L11.294 1.39348C11.6845 1.00295 12.3176 1.00295 12.7082 1.39348L15.3148 4.00008H19.0011C19.5533 4.00008 20.0011 4.4478 20.0011 5.00008V8.68637L22.6077 11.293C22.9982 11.6835 22.9982 12.3167 22.6077 12.7072L20.0011 15.3138V19.0001C20.0011 19.5524 19.5533 20.0001 19.0011 20.0001H15.3148L12.7082 22.6067C12.3176 22.9972 11.6845 22.9972 11.294 22.6067L8.68735 20.0001H5.00106C4.44877 20.0001 4.00106 19.5524 4.00106 19.0001V15.3138L1.39446 12.7072C1.00393 12.3167 1.00393 11.6835 1.39446 11.293L4.00106 8.68637V5.00008C4.00106 4.4478 4.44877 4.00008 5.00106 4.00008H8.68735ZM6.00106 6.00008V9.5148L3.51578 12.0001L6.00106 14.4854V18.0001H9.51578L12.0011 20.4854L14.4863 18.0001H18.0011V14.4854L20.4863 12.0001L18.0011 9.5148V6.00008H14.4863L12.0011 3.5148L9.51578 6.00008H6.00106ZM12.0011 16.0001C9.79192 16.0001 8.00106 14.2092 8.00106 12.0001C8.00106 9.79094 9.79192 8.00008 12.0011 8.00008C14.2102 8.00008 16.0011 9.79094 16.0011 12.0001C16.0011 14.2092 14.2102 16.0001 12.0011 16.0001ZM12.0011 14.0001C13.1056 14.0001 14.0011 13.1047 14.0011 12.0001C14.0011 10.8955 13.1056 10.0001 12.0011 10.0001C10.8965 10.0001 10.0011 10.8955 10.0011 12.0001C10.0011 13.1047 10.8965 14.0001 12.0011 14.0001Z"></path></svg>
                  </i>
                </span>
              </span>
            </span>
          </span>
                </button>
            </div>
            <div className='flex-1 mb-2 flex flex-col  py-2 overflow-x-hidden  bg-[#ffffff0c] -mt-1 rounded-2xl mr-4 ml-2  h-[100%] dahboardContainer' >
                {children}
            </div>
        </div>
    )

}