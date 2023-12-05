import React from 'react'
import DashboardLayout from "@/dashboardLayout";
import {useAppStore} from "@/store/app";
import StoryBlock from "@/components/story/storyBlock";
import {openNewProjectModal} from "@/components/modal/newProject";

export default function Dashboard() {
    const {projects} = useAppStore()
    return (
        <DashboardLayout>
            <div className="flex-1 px-2 sm:px-0">
                <div
                    className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div
                        className="group button-86 bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                        <a onClick={openNewProjectModal}
                           className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
                           href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                        </a>
                        <a className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">Create
                            Hero</a>
                    </div>
                    {projects.map((project) => {
                        return <StoryBlock key={project.id} project={project}/>
                    })}
                </div>
            </div>
        </DashboardLayout>
    )
}
