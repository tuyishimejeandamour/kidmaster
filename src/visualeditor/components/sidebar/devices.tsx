import React from 'react'

export default function Devices() {
    return (
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
                <li className="md:px-4">
                    <a href="#"
                        className="active relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-blue-500 text-gray-300 hover:text-gray-100 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <svg className="w-5 h-5  text-white" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M14.341 12.03l4.343 4.343-5.656 5.656h-2v-6.686l-4.364 4.364-1.415-1.414 5.779-5.778v-.97L5.249 5.765l1.415-1.414 4.364 4.364V2.029h2l5.656 5.657-4.343 4.343zm-1.313 1.514v5.657l2.828-2.828-2.828-2.829zm0-3.03l2.828-2.828-2.828-2.828v5.657z" /></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">Add device</span>
                    </a>
                </li>
                <li className="px-5 hidden md:block">
                    <div className="flex flex-row items-center h-8">
                        <div className="text-sm font-light tracking-wide text-gray-200 uppercase">Devices</div>
                    </div>
                </li>
                <li className="md:px-4">
                    <a href="#"
                        className="active relative flex flex-row items-center h-11 focus:outline-none bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-gray-300 hover:text-gray-100 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <svg className="w-5 h-5  text-white" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M14.341 12.03l4.343 4.343-5.656 5.656h-2v-6.686l-4.364 4.364-1.415-1.414 5.779-5.778v-.97L5.249 5.765l1.415-1.414 4.364 4.364V2.029h2l5.656 5.657-4.343 4.343zm-1.313 1.514v5.657l2.828-2.828-2.828-2.829zm0-3.03l2.828-2.828-2.828-2.828v5.657z" /></svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">mushyoma</span>
                    </a>
                </li>
                <li className="md:px-4">
                    <a href="#"
                        className="relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-zinc-700/50 text-gray-300 hover:text-gray-100 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <svg className="w-5 h-5  text-white" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M14.341 12.03l4.343 4.343-5.656 5.656h-2v-6.686l-4.364 4.364-1.415-1.414 5.779-5.778v-.97L5.249 5.765l1.415-1.414 4.364 4.364V2.029h2l5.656 5.657-4.343 4.343zm-1.313 1.514v5.657l2.828-2.828-2.828-2.829zm0-3.03l2.828-2.828-2.828-2.828v5.657z" /></svg>                            </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                            <span className="mr-16">Karenzi</span>
                        </span>
                    </a>
                </li>
                <li className="md:px-4">
                    <a href="#"
                        className="relative flex flex-row items-center h-11 focus:outline-none rounded-lg hover:bg-zinc-700/50 text-gray-300 hover:text-gray-100 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <svg className="w-5 h-5  text-white" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M14.341 12.03l4.343 4.343-5.656 5.656h-2v-6.686l-4.364 4.364-1.415-1.414 5.779-5.778v-.97L5.249 5.765l1.415-1.414 4.364 4.364V2.029h2l5.656 5.657-4.343 4.343zm-1.313 1.514v5.657l2.828-2.828-2.828-2.829zm0-3.03l2.828-2.828-2.828-2.828v5.657z" /></svg>                            </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                            <span className="mr-4">dobby</span>
                        </span>
                    </a>
                </li>


            </ul>
        </div>
    )
}
