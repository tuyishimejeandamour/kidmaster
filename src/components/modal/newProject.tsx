import React from 'react';
import {Modal} from '@arco-design/web-react';
import StoryCategory from "@/components/story/StoryCategory";
import {ProjectCategory} from "@/store/app";


export function openNewProjectModal() {
    Modal.confirm({
        title: null,
        className: 'create-project-modal',
        footer: null,
        icon: null,
        wrapClassName: "wrapperModal",
        content: <NewProjectModal/>,
    });
}

export const NewProjectModal: React.FC = React.memo(() => {

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


    return (
        <div
            className="w-full flex flex-col shadow-2xl subpixel-antialiased rounded h-full max-h-[calc(90vh-10px)] bg-black border-black mx-auto">
            <div
                className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black"
                id="headerTerminal">
                <div
                    className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
                    id="closebtn">
                </div>
                <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
                </div>
                <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
                </div>
                <div className="mx-auto pr-16" id="terminaltitle">
                    <p className="text-center text-sm">Choose Project</p>
                </div>
            </div>
            <div className={"flex-1 overflow-y-auto"}>
                <div className="p-4 flex h-full w-full flex-wrap items-center overflow-y-auto justify-center">

                    {data.map((project) => {
                        return <StoryCategory key={project.id} info={project}/>
                    })}
                </div>
            </div>
        </div>

    )
});
NewProjectModal.displayName = 'RunCodeModal';