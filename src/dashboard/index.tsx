import React, { useEffect, useRef, useState } from "react";
import { ProjectCategory, useAppStore } from "@/store/app";
import { useNavigate } from "react-router-dom";
import StoryBlock from "@/components/story/storyBlock";
import { motion } from "framer-motion";
import Project from "@/dashboard/project";
import { persist } from "@/visualeditor";
import ProjectCategoryCard from "@/components/project/projectCategory";

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
    exit: {
        opacity: 0, y: 100
    },
};
const content = (isFirstMount: Boolean) => ({
    animate: {
        transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 0.8 : 0 },
    },
});



export default function DashboardLayout() {
    const router = useNavigate()
    const { setActiveCategory,projects,activeCategory } = useAppStore();
    const data: ProjectCategory[] = [
        {
            "id": "1",
            "name": "Project 1",
            "image": "../../../public/assests/bot1.png",
            "color": "bg-orange-500"
        },
        {
            "id": "2",
            "name": "Project 2",
            "image": "../../../public/assests/bot2.png",
            "color": "bg-purple-500"
        },
        {
            "id": "3",
            "name": "Project 3",
            "image": "../../../public/assests/bot3.png",
            "color": "bg-red-500"
        },
        {
            "id": "4",
            "name": "Project 4",
            "image": "../../../public/assests/bot4.png",
            "color": "bg-teal-500"

        }
    ];
    const loadHistory = () => {
        persist.loadHistory().then((res) => {
            useAppStore.getState().setProjects(res as any)
            setActiveCategory('history')

        })
    }
    useEffect(() => {
        loadHistory()
    }, []);
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
                    <div className={"flex-1 relative flex-col flex px-4 pt-10  h-full overflow-auto"}>
                        <div className="main-con w-full">
                            <div className="mx-auto max-w-4xl">
                                <motion.div
                                    className="grid relative items-center justify-center grid-cols-1 md:grid-cols-2 lg:px-0 px-8 lg:grid-cols-3 p-contain "
                                    initial="initial"
                                    animate="animate"
                                    variants={content(true)}
                                >
                                    {
                                        projects.map((project) => {
                                            return <Project key={project.id} project={project} />
                                        })
                                    }
                                    {
                                        projects.length === 0 &&
                                        <>
                                            {data.map((project) => {
                                                return <ProjectCategoryCard key={project.id} project={project} />
                                            })
                                            }

                                        </>
                                    }
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"w-56 h-full pt-10 flex flex-col   bg-gradient-to-t from-[#ffffff0c] to-[#ffffff0c] backdrop-blur-2xl"}>
                        <div className={"flex px-8 pb-10 flex-col items-start justify-items-start"}>
                            <div
                                className={"w-[70px] h-[70px] rounded-[10px_20px_30px_40px_/_40px_30px_20px_10px] mb-1 flex backdrop-blur-2xl  bg-gradient-to-r from-zinc-300/5 to-zinc-700/75"}>
                                <div
                                    className="flex w-full items-center justify-between rounded-2xl bg-transparent p-3 shadow-3xl  dark:!bg-navy-700 dark:shadow-none">
                                    <div onClick={() => {
                                        setActiveCategory('history')
                                        loadHistory()
                                    }}
                                        className={`mr-4 p-4 rounded-2xl flex items-center justify-center text-white dark:text-white  hover:cursor-pointer hover:bg-slate-400/50 ${activeCategory.includes('history')?" activeBackground":null}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"gap-5 grid relative grid-cols-2 justify-items-center items-start px-8"}>
                            {data.map((project) => {
                                return <StoryBlock key={project.id} project={project} />
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )

}