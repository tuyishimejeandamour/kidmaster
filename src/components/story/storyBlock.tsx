import {ProjectCategory, useAppStore} from "@/store/app";
import {projectdummyData} from "@/store/dumyData";

export default function StoryBlock({project}: { project: ProjectCategory }) {
    const {activeCategory, setProjects, setActiveCategory} = useAppStore()

    const handProjectCategoryChange = (name: string) => {
        setActiveCategory(name)
        const projects = projectdummyData.filter((project) => project.category.name === name);
        setProjects(projects)

    }
    return (
        <div
            className={"w-full h-[70px] rounded-[10px_20px_30px_40px_/_40px_30px_20px_10px] mb-1 flex backdrop-blur-2xl  bg-gradient-to-r from-zinc-300/5 to-zinc-700/75 "}>
            <div
                className="flex w-full items-center justify-between rounded-2xl bg-transparent p-3 shadow-3xl  dark:!bg-navy-700 dark:shadow-none">
                <div onClick={() => handProjectCategoryChange(project.name)}
                     className={`mr-4 p-4 rounded-2xl flex items-center justify-center text-gray-300 dark:text-white hover:cursor-pointer hover:bg-slate-400/50 ${activeCategory == project.name ? "activeBackground" : null} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
                    </svg>

                </div>
            </div>
        </div>
    )
}