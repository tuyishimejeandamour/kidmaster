import React from 'react'

interface IDashboardHeader {
    isDashboard: boolean,
    name: string
}
export const Header: React.FC<IDashboardHeader> = () => {
    return (
        <div className='h-full w-full flex justify-between'>
            <div className='flex flex-1 items-center'>
                    <div className="flex items-center justify-center">
                        <button type="button" className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-3 py-0.5 text-center mr-3  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
                        <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium  text-center mr-3  px-3 py-0.5 dark:text-white dark:focus:ring-gray-800">Cars</button>
                        <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium  text-center mr-3  px-3 py-0.5 dark:text-white dark:focus:ring-gray-800">Leds</button>
                        <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium  text-center mr-3  px-3 py-0.5 dark:text-white dark:focus:ring-gray-800">Sensors</button>
                        <button type="button" className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium  text-center mr-3  px-3 py-0.5 dark:text-white dark:focus:ring-gray-800">studying</button>
                    </div>
            </div>
            <div className='flex items-center'>
                <div className="flex  justify-center items-center transition-all   bg-blue-500 h-8 w-10 hover:w-24 rounded-lg text-sm shadow-sm shadow-blue-700 text-white hover:border-transparent hover:cursor-pointer" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-4 h-4 fill-white" viewBox="0 0 24 24" width="24" height="24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" ></path></svg>
                    <span className='w-0 overflow-hidden truncate text-[11px]'>add project</span>
                </div>
            </div>
        </div>
    )
}
