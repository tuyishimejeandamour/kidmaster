import {motion} from "framer-motion"
import {IconStar} from "@arco-design/web-react/icon";
import {useNavigate} from "react-router-dom";
import robotGif from "../assets/output-onlinegiftools.gif";
import React, {useState} from "react";
import Comments from "@/dashboard/comments/comments";
import {ProjectStory, useAppStore} from "@/store/app";
import {PersistStorage} from "@/visualeditor/utils/StorageRender";
import {setCurrentData} from "@/visualeditor/utils/persist";
import {Modal} from "@arco-design/web-react";
import {newProject} from "@/store/initialProject";

const animations = {
    initial: {opacity: 0, y: -100},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 100},
};


export default function SelectedProject() {
    const router = useNavigate();
    const [showQuestions, setShowQuestions] = useState(false)
    const {setCurrentProject, currentProject} = useAppStore();
    const [visible, setVisible] = useState(false);
    const [projectData, setProjectData] = useState<ProjectStory>(newProject);
    const handleCreateProject = () => {
        setVisible(true);
    }
    const handleSaveProject = () => {

        PersistStorage.setState(projectData.id, {
            options: {project: true},
            data: projectData
        });
        setCurrentProject(projectData);
        setCurrentData(projectData.chime);
        router(`/editor`)

    }

    return (
        <>
            <motion.div
                className='max-w-screen-2xl relative flex w-full h-full'
                variants={animations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{duration: 1}}

            >
                <div
                    className='w-full  flex isolate flex-col rounded-3xl relative  overflow-x-hidden  bg-[#ffffff0c] -mt-1  mr-4 ml-4  h-[calc(100%-10px)] shadow-xl '>
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

                    <div className="w-full flex-1 overflow-hidden flex justify-between">
                        <div className="w-full h-full flex overflow-hidden  items-center justify-evenly">
                            <div className="flex   flex-col items-center justify-center relative h-full w-3/5">
                                <div className="absolute inset-0 left-0 w-full h-full">
                                    <div
                                        className="absolute right-full top-5 origin-right -scale-x-100 aspect-[969/887] w-full">

                                        <img alt="" width="1938" height="1774" decoding="async"
                                             data-nimg="1" className="absolute inset-0 h-full w-full"
                                             src="https://clerk.com/_next/static/media/circuit-lines@2xl.ee1ad3dd.webp"
                                             style={{color: "transparent"}}/>
                                    </div>
                                </div>
                                <section className="antialiased h-full w-full flex items-center justify-center">
                                    <div className="h-1/2 w-3/4  relative max-w-sm">
                                        <div
                                            className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl"/>
                                        <div
                                            className="relative shadow-xl w-full  border border-blue-600  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                            <img className={"w-full rounded-2xl h-full"}
                                                 src={robotGif}
                                                 alt={"done with all the tasks"}/>
                                        </div>
                                    </div>
                                    <Meteors number={10}/>
                                </section>
                                <div className="flex items-center w-full absolute justify-between bottom-20  px-12">

                                    <button
                                        className={"px-8 relative text-white py-2 flex items-center rounded-2xl bg-blue-600"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
                                        </svg>
                                        <span className={"ml-4"}>FullScreen</span>
                                    </button>
                                    <div className={"flex text-indigo-100 "}>
                                        <button className={"p-2 rounded-full hover:accent-gray-400"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6  h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                            </svg>

                                        </button>
                                        <button
                                            className={"p-2 ml-4 flex justify-center items-center rounded-full bg-blue-600 hover:bg-blue-600"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-2/5 h-full flex flex-col p-8 text-indigo-100  bg-gradient-to-t from-[#ffffff0c] to-[#ffffff0c] backdrop-blur-0xl">
                                <div className="flex justify-between space-x-2">
                                    <div className={"flex items-center flex-1"}>
                                        <button className={"rounded-full bg-blue-200/30 p-2"}
                                                onClick={() => router("/")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                            </svg>
                                        </button>
                                        <h3 className="text-1xl ml-4 text-white font-bold">Robot X05</h3>
                                    </div>
                                    <div className={"flex gap-4"}>
                                        <button className={"rounded-full hover:bg-blue-600/50 p-2"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                            </svg>
                                        </button>
                                        <button className={"relative"} onClick={() => setShowQuestions(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                                            </svg>
                                            <span
                                                className="absolute bg-blue-500 text-blue-100 px-1 py-1 text-xs font-bold rounded-full -top-3 -right-3">99+</span>
                                        </button>
                                    </div>
                                </div>
                                {!showQuestions && <>
                                    <div className="flex  justify-between items-start">
                                        <div className="flex flex-col">
                                            <div className={"flex items-start justify-end "}>
                                                <div className="flex items-center mt-2">
                                                    <IconStar className="w-4 h-4 text-yellow-400"/>
                                                    <IconStar className="w-4 h-4 text-yellow-400"/>
                                                    <IconStar className="w-4 h-4 text-yellow-400"/>
                                                    <IconStar className="w-4 h-4 text-yellow-400"/>
                                                    <IconStar className="w-4 h-4 text-gray-300"/>
                                                    <p className="ml-2 text-sm">12 reviews</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm">
                                                An organic shape and smooth finish of this concrete coffee table reflect
                                                nature's elegance.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex-1  overflow-auto">
                                        {[...Array(10).keys()].map((el, idx) => (
                                            <div className="flex py-3 items-center justify-between">
                                                <p>working following the line and make close where its needed</p>
                                                <span
                                                    className={"p-2 hover:bg-blue-50/5 hover:cursor-pointer rounded-3xl"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor"
                                             className="w-6 hover:cursor-pointer h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"/>
                                        </svg>
                                            </span>

                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-end mt-8">
                                        <button
                                            onClick={handleCreateProject}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow transition-colors hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400">
                                            Start Project
                                        </button>
                                    </div>
                                </>
                                }
                                {
                                    showQuestions &&
                                    <Comments/>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </motion.div>
            <Modal
                title={null}
                className={"w-1/2 bg-slate-950"}
                hideCancel={true}
                style={{backgroundColor: "#20232a"}}
                wrapClassName={"wrapperModal"}
                visible={visible}
                footer={null}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <div className={"mt-5"}>
                    <h3 className={"text-white text-2xl font-bold"}>Create New Project
                        from <span>{currentProject?.name}</span></h3>
                    <div className={"mt-2"}>
                        <p className={"text-white text-md"}>Name your project</p>
                        <div
                            className="bg-[#2b303b] mt-2 text-[#d5ced9] text-[12px] w-full border relative block p-0 rounded-sm border-[#444a57]">
                            <div className="relative w-full h-full flex p-1 items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" className={"w-7 h-7 fill-gray-700"}
                                     viewBox="0 0 24 24">
                                    <path
                                        d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM6 7C5.44772 7 5 7.44772 5 8V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V8C19 7.44772 18.5523 7 18 7H13H11H6ZM2 10H0V16H2V10ZM22 10H24V16H22V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5Z"></path>
                                </svg>
                                <input autoFocus={true} autoComplete="off"
                                       className="bg-inherit flex-1 w-[calc(100%-0px)] inline-block h-full  border-none resize-none px-1 py-[6px] text-ellipsis "
                                       autoCorrect="off" autoCapitalize="off" spellCheck="false" type="text"
                                       placeholder={`Enter project name`}
                                       name='command'
                                       value={projectData.name}
                                       onChange={(e) => {
                                           setProjectData({...projectData, name: e.target.value})
                                       }}
                                       onKeyDown={(e) => e.stopPropagation()}


                                />
                            </div>
                        </div>
                        <p className={"text-white text-md mt-2"}>Description</p>
                        <textarea
                            onChange={(e) => {
                                setProjectData({...projectData, description: e.target.value})
                            }}
                            value={projectData.description}
                            onKeyDown={(e) => e.stopPropagation()}
                            className={"bg-[#2b303b] px-1 py-[6px] h-24 text-ellipsis mt-2 text-[#d5ced9] text-[12px] w-full border relative block p-0 rounded-sm border-[#444a57]"}
                            placeholder='Please enter ...'

                        />
                    </div>
                    <div className="flex items-center justify-end mt-8">
                        <button
                            onClick={handleSaveProject}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow transition-colors hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400">
                            Create Project
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export const Meteors = ({number}: { number: number }) => {
    return [...new Array(number || 20).fill(true)].map((el, idx) => (
        <span
            key={idx}
            className="meteor animate-meteor-effect absolute  h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
            style={{
                // top: Math.floor(Math.random() * (0 - -400) + -400) + 'px',
                top: 0,
                left: Math.floor(Math.random() * (400 - -400) + -400) + 'px',
                animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
                animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
            }}
        ></span>
    ));
}

