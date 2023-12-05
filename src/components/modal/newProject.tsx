import React from 'react';
import {Modal} from '@arco-design/web-react';
import StoryCategory from "@/components/story/StoryCategory";


export function openNewProjectModal() {
    Modal.confirm({
        title: null,
        className: 'run-code-modal',
        footer: null,
        icon: null,
        wrapClassName: "wrapperModal",
        content: <NewProjectModal/>,
    });
}

export const NewProjectModal: React.FC = React.memo(() => {

    const data = [
        {
            "id": "1",
            "name": "Project 1",
            "description": "This is a description",
            "color": "red"
        },
        {
            "id": "2",
            "name": "Project 2",
            "description": "This is a description",
            "color": "blue"
        },
        {
            "id": "3",
            "name": "Project 3",
            "description": "This is a description",
            "color": "green"
        },
        {
            "id": "4",
            "name": "Project 4",
            "description": "This is a description",
            "color": "yellow"

        }
    ];


    return (
        <div className="p-4 flex flex-wrap items-center justify-center">
            {data.map((project) => {
                return <StoryCategory info={project}/>
            })}
        </div>
    )
});
NewProjectModal.displayName = 'RunCodeModal';