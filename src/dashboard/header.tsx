import React from 'react'

interface IDashboardHeader {
    isDashboard: boolean,
    name: string
}
export const Header: React.FC<IDashboardHeader> = ({ isDashboard, name }) => {
    return (
        <div className='h-full w-full flex justify-between'>
            <div className='flex flex-1'>
                <div className='h-full flex items-center justify-center w-12 mr-1'>
                    <div className='rounded-full bg-slate-500/60 p-2' >
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7 fill-blue-400' viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z" />
                        </svg>
                    </div>
                </div>
                <div className='flex flex-col justify-center font-medium'>
                    {
                        !isDashboard && (
                            <div className='flex '><span className='text-xs text-gray-200'>dashboard</span></div>
                        )
                    }

                    <div><span className='font-bold'>{name}</span></div>

                </div>
            </div>
            {/* <div className='flex items-center'>
                <div className="flex mr-4  justify-center items-center transition-all addproject  bg-zinc-500/50 h-8 w-8 hover:w-24 rounded-full text-sm shadow-sm shadow-zinc-700 text-white hover:border-transparent hover:cursor-pointer" onClick={() => setOnDashboard(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-4 h-4  fill-white" viewBox="0 0 24 24"><path d="M8.68735 4.00008L11.294 1.39348C11.6845 1.00295 12.3176 1.00295 12.7082 1.39348L15.3148 4.00008H19.0011C19.5533 4.00008 20.0011 4.4478 20.0011 5.00008V8.68637L22.6077 11.293C22.9982 11.6835 22.9982 12.3167 22.6077 12.7072L20.0011 15.3138V19.0001C20.0011 19.5524 19.5533 20.0001 19.0011 20.0001H15.3148L12.7082 22.6067C12.3176 22.9972 11.6845 22.9972 11.294 22.6067L8.68735 20.0001H5.00106C4.44877 20.0001 4.00106 19.5524 4.00106 19.0001V15.3138L1.39446 12.7072C1.00393 12.3167 1.00393 11.6835 1.39446 11.293L4.00106 8.68637V5.00008C4.00106 4.4478 4.44877 4.00008 5.00106 4.00008H8.68735ZM6.00106 6.00008V9.5148L3.51578 12.0001L6.00106 14.4854V18.0001H9.51578L12.0011 20.4854L14.4863 18.0001H18.0011V14.4854L20.4863 12.0001L18.0011 9.5148V6.00008H14.4863L12.0011 3.5148L9.51578 6.00008H6.00106ZM12.0011 16.0001C9.79192 16.0001 8.00106 14.2092 8.00106 12.0001C8.00106 9.79094 9.79192 8.00008 12.0011 8.00008C14.2102 8.00008 16.0011 9.79094 16.0011 12.0001C16.0011 14.2092 14.2102 16.0001 12.0011 16.0001ZM12.0011 14.0001C13.1056 14.0001 14.0011 13.1047 14.0011 12.0001C14.0011 10.8955 13.1056 10.0001 12.0011 10.0001C10.8965 10.0001 10.0011 10.8955 10.0011 12.0001C10.0011 13.1047 10.8965 14.0001 12.0011 14.0001Z"></path></svg>
                    <span className='w-0 overflow-hidden truncate text-[11px] '>settings</span>
                </div>
                <div className="flex  justify-center items-center transition-all addproject  bg-blue-500 h-8 w-10 hover:w-24 rounded-lg text-sm shadow-sm shadow-blue-700 text-white hover:border-transparent hover:cursor-pointer" onClick={() => setOnDashboard(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-4 h-4 fill-white" viewBox="0 0 24 24" width="24" height="24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" ></path></svg>
                    <span className='w-0 overflow-hidden truncate text-[11px]'>add project</span>
                </div>
            </div> */}
        </div>
    )
}
