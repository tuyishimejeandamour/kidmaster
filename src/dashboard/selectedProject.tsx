import { motion } from "framer-motion"
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

const animations = {
    initial: {opacity: 0, y: -100},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 100},
};


export default function SelectedProject() {
    return (
        <motion.div
            className='max-w-screen-2xl relative flex w-full h-full'
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 1}}

        >
            <div
                className='w-full pb-5 flex isolate flex-col rounded-3xl relative  overflow-x-hidden  bg-[#ffffff0c] -mt-1  mr-4 ml-4  h-[calc(100%-10px)] shadow-xl '>
                <svg
                    className="absolute inset-x-0 top-0 -z-10 h-full w-full stroke-gray-500/25 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                    aria-hidden="true">
                    <defs>
                        <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1"
                                 patternUnits="userSpaceOnUse">
                            <path d="M.5 200V.5H200" fill="none"></path>
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-gray-50/10">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            strokeWidth="0"></path>
                    </svg>
                    <rect width="100%" height="100%" strokeWidth="0"
                          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"></rect>
                </svg>
                <div className="w-full flex-1 flex justify-between">
                    <div className="w-full h-full p-8 flex flex-col items-center justify-between">
                        <div className="flex justify-between w-full mb-12">
                            <div className="flex space-x-4">
                                <TreesIcon className="text-white"/>
                                <BellRingIcon className="text-white"/>
                                <DropletsIcon className="text-white"/>
                                <AppleIcon className="text-white"/>
                                <CitrusIcon className="text-white"/>
                            </div>
                            <div className="text-white  text-3xl font-bold leading-none">Diseña tu cocktail</div>
                            <div className="flex items-center space-x-4">
                                <div className={"rounded-full w-12 flex justify-center items-center   h-12 bg-blue-600"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-6 text-white h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-start flex-1">
                            <div className="flex w-full h-full items-center space-x-6 justify-center">
                                <div className="bg-white rounded-lg shadow-lg flex-1">
                                    <div className="flex flex-col items-center p-4">
                                        <img
                                            alt="Sugarcane"
                                            className="mb-4"
                                            height="128"
                                            src="../../../public/assests/bot3.png"
                                            style={{
                                                aspectRatio: "128/128",
                                                objectFit: "cover",
                                            }}
                                            width="128"
                                        />
                                        <div className="text-center text-gray-800 font-semibold">Sugarcane</div>
                                    </div>
                                </div>
                                <div className="rounded-lg shadow-lg flex-1">
                                    <div className="flex flex-col items-center p-4">
                                        <img
                                            alt="Pineapple"
                                            className="mb-4"
                                            height="128"
                                            src="../../../public/assests/bot3.png"
                                            style={{
                                                aspectRatio: "128/128",
                                                objectFit: "cover",
                                            }}
                                            width="128"
                                        />
                                        <div className="text-center text-gray-800 font-semibold">Pineapple</div>
                                    </div>
                                </div>
                                <div className="rounded-lg shadow-lg flex-1">
                                    <div className="flex flex-col items-center p-4">
                                        <img
                                            alt="Cantaloupe"
                                            className="mb-4"
                                            height="128"
                                            src="../../../public/assests/bot3.png"
                                            style={{
                                                aspectRatio: "128/128",
                                                objectFit: "cover",
                                            }}
                                            width="128"
                                        />
                                        <div className="text-center text-gray-800 font-semibold">Cantaloupe</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-between items-center space-x-4 mt-12">
                            <div className="space-y-6">
                                <div className="flex items-center  justify-between">
                                    <div className="bg-[#ff5cad]  rounded text-white" >
                                        Predisposition to allergen / Configure
                                    </div>
                                    <div className="bg-[#ff5cad] h-16 rounded-2xl text-white">
                                        High pressure processing (HPP)
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <GaugeIcon className="text-white"/>
                                <WifiIcon className="text-white"/>
                                <LocateIcon className="text-white"/>
                                <BellIcon className="text-white"/>
                                <button className="bg-[#ff5cad] text-white">Cocktail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function AppleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
            <path d="M10 2c1 .5 2 2 2 5"/>
        </svg>
    )
}


function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
    )
}


function BellRingIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            <path d="M4 2C2.8 3.7 2 5.7 2 8"/>
            <path d="M22 8c0-2.3-.8-4.3-2-6"/>
        </svg>
    )
}


function CitrusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"/>
            <path d="M19.65 15.66A8 8 0 0 1 8.35 4.34"/>
            <path d="m14 10-5.5 5.5"/>
            <path d="M14 17.85V10H6.15"/>
        </svg>
    )
}


function DropletsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
        </svg>
    )
}


function GaugeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 14 4-4" />
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
    )
}


function LocateIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="2" x2="5" y1="12" y2="12" />
            <line x1="19" x2="22" y1="12" y2="12" />
            <line x1="12" x2="12" y1="2" y2="5" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <circle cx="12" cy="12" r="7" />
        </svg>
    )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function TreesIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
            <path d="M7 16v6" />
            <path d="M13 19v3" />
            <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
        </svg>
    )
}


function WifiIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 13a10 10 0 0 1 14 0" />
            <path d="M8.5 16.5a5 5 0 0 1 7 0" />
            <path d="M2 8.82a15 15 0 0 1 20 0" />
            <line x1="12" x2="12.01" y1="20" y2="20" />
        </svg>
    )
}

