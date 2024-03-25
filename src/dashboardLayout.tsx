import React, {useRef, useState} from "react";
import {ProjectCategory, useAppStore} from "@/store/app";
import {useNavigate} from "react-router-dom";
import StoryBlock from "@/components/story/storyBlock";
import { motion } from "framer-motion";
import Project from "@/dashboard/project";

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
        }, },
    exit: {
        opacity: 0, y: 100
    },
};
const content = (isFirstMount: Boolean) => ({
    animate: {
        transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 0.8 : 0 },
    },
});



export default function DashboardLayout({children}:{children:React.ReactNode}){
    const { setOnDashboard } = useAppStore()
    const router = useNavigate()
    const [isOpen, setOpen] = useState(false);
    const data:ProjectCategory[] = [
        {
            "id": "1",
            "name": "Project 1",
            "image":"../../../public/assests/bot1.png",
            "color": "bg-orange-500"
        },
        {
            "id": "2",
            "name": "Project 2",
            "image":"../../../public/assests/bot2.png",
            "color": "bg-purple-500"
        },
        {
            "id": "3",
            "name": "Project 3",
            "image":"../../../public/assests/bot3.png",
            "color": "bg-red-500"
        },
        {
            "id": "4",
            "name": "Project 4",
            "image":"../../../public/assests/bot4.png",
            "color": "bg-teal-500"

        }
    ];
    return (
        <>
        <motion.div
            className='max-w-screen-2xl flex w-full h-full'
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 2 }}
        >
            <div
                className='flex-1 w-full  flex  rounded-3xl relative  overflow-x-hidden  bg-[#ffffff0c] -mt-1  mr-4 ml-4  h-[calc(100%-10px)] shadow-xl '>
                <div className={"flex-1  flex-col flex px-4 pt-10  h-full overflow-auto"}>
                    <div className="main-con w-full border-t border-b border-gray-500/20">
                        <div className="mx-auto max-w-4xl">
                            <motion.div
                                className="grid relative grid-cols-1 lg:px-0 px-8 lg:grid-cols-3 p-contain "
                                initial="initial"
                                animate="animate"
                                variants={content(true)}
                            >
                                {
                                    data.map((project) => {
                                        return <Project key={project.id} project={project}/>
                                    })
                                }


                            </motion.div>
                        </div>
                    </div>

                </div>
                <div className={"w-56 h-full pt-10 flex flex-col   bg-gradient-to-t from-[#ffffff0c] to-[#ffffff0c] backdrop-blur-2xl"}>
                    <div className={"flex px-8 pb-10 flex-col items-start justify-items-start"}>
                        <div
                            className={"w-[70px] h-[70px] rounded-[10px_20px_30px_40px_/_40px_30px_20px_10px] mb-1 flex backdrop-blur-2xl  bg-gradient-to-r from-zinc-300/5 to-zinc-700/75"}>
                            <div
                                className="flex w-full items-center justify-between rounded-2xl bg-transparent p-3 shadow-3xl  dark:!bg-navy-700 dark:shadow-none">
                                <div onClick={() => {
                                    router('/editor')
                                }}
                                     className="mr-4 p-4 rounded-2xl flex items-center justify-center text-gray-600 dark:text-white hover:cursor-pointer bg-blue-600/90">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"/>
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"gap-5 grid relative grid-cols-2 justify-items-center items-start px-8"}>
                        {data.map((project) => {
                            return <StoryBlock key={project.id} project={project}/>
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
        </>
    )

}