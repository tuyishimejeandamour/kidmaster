import React, {ChangeEvent, useState} from 'react';
import { Modal } from '@arco-design/web-react';
import {useNodes} from "@/hooks/useNodes";

type ConfirmAction = "group"
export function openConfirmModal(code:ConfirmAction) {
    Modal.confirm({
        title: null,
        className: 'confirm-code-modal',
        footer: null,
        icon: null,
        wrapClassName: "wrapperModal",
        content: <InputModal action={code}  />,
    });
}

export const InputModal: React.FC<{action:ConfirmAction}> = React.memo((props) => {
    const [confirmValue, setConfirmValue] = useState("");
    const {handleCreateNode } = useNodes()

 const handleChange = (e:any)=>{
     setConfirmValue(e.target.value)
 }

    const handleCreate = ()=> {
         if(props.action === "group") {
             handleCreateNode("group_"+confirmValue)
         }
        Modal.destroyAll();

    }

    return (
        <div className="relative">
            <input type="text" onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} value={confirmValue} className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Enter name..." />
                <div className="absolute top-2 right-2">
                    <button onClick={handleCreate} className="h-10 w-20 text-white rounded-lg bg-[#20232a] hover:bg-[#20232a]">Create</button>
                </div>
        </div>
    )
});
InputModal.displayName = 'RunCodeModal';