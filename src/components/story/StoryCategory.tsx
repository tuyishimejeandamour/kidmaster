import React from "react";
import {ProjectCategory} from "@/store/app";

export default function StoryCategory({info}: { info: ProjectCategory }) {
    return (
        <div className="flex-shrink-0 m-6 my-1 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg">
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
                <img className="relative w-32"
                     src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
                     alt=""/>
            </div>
            <div className="relative text-white px-3 pb-3 mt-3">
                <span className="block opacity-75 -mb-1">Indoor</span>
                <div className="flex justify-between">
                    <span className="block font-semibold text-xl">Peace Lily</span>
                    <span
                        className="bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                </div>
            </div>
        </div>
    )
}