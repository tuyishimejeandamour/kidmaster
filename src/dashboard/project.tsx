import React from 'react'

export default function Project() {
    return (
        <div className='w-full flex flex-col  bg-[rgba(255,255,255,0.2)]  rounded-lg '>
            <div className='flex-1 px-2 py-2 flex justify-between'>
                <div className='flex gap-2  items-center'>
                    <div className='h-full flex items-center justify-center w-9'>
                        <div className='rounded-full bg-slate-500/10 p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 fill-blue-400'
                                 viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z"/>
                            </svg>
                        </div>
                    </div>
                    <div className='flex xl:flex-col justify-between flex-1'>
                        <div className='mr-4 text-gray-200'>LED blinking</div>
                        <time className='text-xs hidden xl:block py-[2px] text-gray-500'>edited 12 minutes ago</time>
                    </div>
                </div>
                <div className='flex gap-2  items-center'>
                    <div className='h-full flex items-center justify-center w-6'>
                        <div className='rounded-full bg-slate-500/10 p-2'>
                            <span className='text-blue-400 w-3 h-3 text-center text-[11px] block truncate'>5</span>
                        </div>
                    </div>
                    <div className='flex  justify-between flex-1'>
                        <div className='text-xs py-[2px] text-gray-500'>Functions</div>
                    </div>
                </div>
                <div className='flex gap-2  items-center'>
                    <div className='h-full flex items-center justify-center w-6'>
                        <div className='rounded-full relative bg-slate-500/10 p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3 fill-blue-400'
                                 viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z"/>
                            </svg>
                            <span className=' bg-red-600 absolute right-0 -top-[1px] w-[6px] h-[6px] rounded-full'/>
                        </div>
                    </div>
                    <div className='flex xl:flex-col justify-between flex-1'>
                        <div className='text-xs py-[2px] text-gray-500'>Comments</div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <time className='text-xs block xl:hidden py-[2px] text-gray-500'>Edited 12 minutes ago</time>
                </div>
                <div className='flex items-center w-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-white w-4 h-4  fill-gray-400'
                         viewBox="0 0 24 24">
                        <path
                            d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}
