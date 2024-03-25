import React from "react";
import {ProjectCategory} from "@/store/app";
import {useNavigate} from "react-router-dom";

export default function StoryCategory({info}: { info: ProjectCategory }) {

    const navigation = useNavigate();
    return (
        <div onClick={()=>navigation('/project')} className={`flex-shrink-0 m-6 md:m-2 md:w-40 my-1 h-36 hover:cursor-pointer relative overflow-hidden ${info.color} rounded-lg max-w-xs shadow-lg`}>
            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                 style={{transform: "scale(1.5)", opacity: 0.1}}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)"
                      fill="white"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
            </svg>
            <div className="relative pt-4 px-4 flex items-center justify-center">
                <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: 0.2
                }}></div>
                <img className="relative w-40"
                     src={info.image}
                     alt={info.name}/>
            </div>
            <div className="relative text-white px-3 pb-3 mt-3">
                <span className="block opacity-75 -mb-1">personal</span>
                <div className="flex justify-between">
                    <span className="block font-semibold text-xl">{info.name}</span>
                </div>
            </div>
        </div>
    )
}