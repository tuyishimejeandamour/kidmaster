import React from 'react'
import DashboardLayout from "@/dashboardLayout";
import {ProjectCategory, useAppStore} from "@/store/app";
import StoryBlock from "@/components/story/storyBlock";
import {openNewProjectModal} from "@/components/modal/newProject";
import Carousel from "@/dashboard/carousel/carousel";

export default function Dashboard() {
    const projects:ProjectCategory[] = [
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
        <DashboardLayout>
            <div className="flex-1 px-2 sm:px-0">
                <div
                    className="mb-10 sm:mb-0 mt-10 flex flex-col">

                </div>
            </div>
        </DashboardLayout>
    )
}
