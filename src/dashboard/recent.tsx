import React from 'react'

export default function Recent() {
    return (
        <div className='w-64  flex flex-col  bg-[rgba(255,255,255,0.2)]   rounded-lg ' >
            <div className='w-full  bg-black h-40 rounded-t-lg'>

            </div>
            <div className='flex-1 px-2 py-2 flex justify-between'>
                <div className='flex flex-col'>
                    <div>LED blinking</div>
                    <time className='text-xs py-[2px] text-gray-500' >edited 12 minutes ago</time>
                </div>
                <div className=''>

                </div>
            </div>
        </div>
    )
}
