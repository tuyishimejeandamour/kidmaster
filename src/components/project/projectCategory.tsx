import {ProjectCategory} from "@/store/app";

export default function ProjectCategoryCard({project}: { project: ProjectCategory }) {
    return (
        <div
            className="projectCategoryCard w-52 mt-4 h-64 bg-gradient-to-t from-[#ffffff0c] to-[#ffffff0c] backdrop-blur-2xl  text-white p-[56px_16px_16px_16px] rounded-[15px] cursor-pointer relative transition-shadow duration-250">
            <div className="icon z-2 relative inline-table p-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                     strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"
                     className="relative z-1 block w-6 h-6 transform-gpu text-[--card-icon-color]">
                    <path
                        d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z"/>
                </svg>
            </div>
            <h4 className="z-2 relative mt-3 mb-1 font-semibold text-sm leading-8 text-[--card-label-color]">{project.name}</h4>
            <p className="z-2 relative text-[14px] leading-[1.7] text-white">Standard chunk of Lorem Ipsum used since
                the 1500s is showed below for those interested.</p>
            <div
                className="shine absolute inset-0 rounded-inherit overflow-hidden opacity-0 transition-opacity duration-500">
                <div
                    className="absolute left-[50%] bottom-[55%] h-[150%] w-[150%] rounded-full blur-[35px] opacity-[--card-shine-opacity] bg-[--card-shine-gradient] translate-x-[-50%]"></div>
            </div>
        </div>
    )

}