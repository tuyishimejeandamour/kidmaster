import React from 'react'


const FunctionsComands: React.FC<{
    onNodeClick: (Nodename: string, data?: Record<string, string>) => void
}> = React.memo(({onNodeClick}) => {

        const handleNodeClick = (nodename: string, data?: Record<string, string>) => {
            onNodeClick(nodename, data)
        }

        return (
            <div className='flex flex-col w-full mt-4 '>

                <div
                    className='bg-[#373b44] flex items-center justify-between text-[#d5ced9] px-4 h-9 text-[13px] w-full border border-transparent relative  p-0 rounded-sm '>
                    <div className='flex items-center gap-3 truncate'>
                        <span className='capitalize text-[10px]'>we are actively developing the app</span>
                        <span className='block text-blue-500 text-xs'>
                       Function to be added
                    </span>
                    </div>

                </div>

            </div>

        )
    }
)

export default FunctionsComands


