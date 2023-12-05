import React from "react";
import {ProjectStory} from "@/store/app";

export default function StoryBlock({project}: { project: ProjectStory }) {
    return (
        <div
            className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
            <img className="w-20 h-20 object-cover object-center rounded-full"
                 src="https://images.unsplash.com/photo-1547592180-85f173990554?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                 alt="cuisine"/>
            <h4 className="text-white text-2xl font-bold capitalize text-center">Cuisine</h4>
            <p className="text-white/50">55 members</p>
            <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">22 Online <span
                className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
        </div>
    )
}