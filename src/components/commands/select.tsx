import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNodes } from '../../hooks/useNodes';
import { useUIStore } from '../../visualeditor';
import ActionsComands from './actions';
import VariableComands from './variable';
import FunctionsComands from './function';
import { useScroll } from 'ahooks';


interface IModalChoose {
    selectedNode: (nodeName: string, data?: Record<string, any>) => void;
    onCancel: Function;
    toReturn: boolean
    onValue: Function;
    onFunction: Function
}

function ConfirmModal({ selectedNode, onCancel, toReturn, onFunction, onValue }: IModalChoose) {

    const { search, searchValue, handleCreateNode } = useNodes()
    const { openComandModal, groupCommand, setGroupCommand } = useUIStore()
    const [showShadow, setShowShadow] = useState(false)

    const handleClick = (event: MouseEvent) => {
        if ((event.composedPath()[event.composedPath().length - 6] as HTMLElement).id != "commands" &&
            !((event.composedPath()[event.composedPath().length - 6] as HTMLElement).attributes["trigger-placement" as any])) {

            openComandModal(false)
        }

    }
    const handleNodeClick = (nodeName: string, data?: Record<string, any>) => {
        openComandModal(false)
        if (toReturn) {
            selectedNode(nodeName, data);
            return
        }
        handleCreateNode(nodeName, data)
    }
    const handleFunctionClick = () => {
        openComandModal(false)
    }
    const handleKey = (ev: KeyboardEvent) => {

        if (ev.key == "Escape") {
            onCancel()
        }
    }
    const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.value[0] === '@') {

            setGroupCommand('function')
        } else if (ev.target.value[0] === '>') {
            setGroupCommand('variable')
        } else {
            search(ev.target.value)
        }
    }
    const handlebackspace = (ev: KeyboardEvent) => {
        ev.stopPropagation()
        if (ev.key === "Backspace" && searchValue.length === 0) {
            setGroupCommand('action')
        }
        if (ev.key == "Escape") {
            onCancel()
        }

    }
    const handleContainerScroll = () => {
        console.log("he")
        setShowShadow(true)
    }

    useEffect(() => {
        document.getElementById("commandInput")?.focus()
        window.addEventListener("keydown", handleKey)
        window.addEventListener("click", handleClick);
        document.getElementById('commandTap')?.addEventListener("scroll", handleContainerScroll)

        return () => {
            window.removeEventListener("keydown", handleKey)
            window.removeEventListener("click", handleClick);
            document.getElementById('commandTap')?.removeEventListener("scroll", handleContainerScroll)

        }
    }, [])
    return (
        <>
            <div className="bg-[rgba(255,255,255,0.1)]  items-center rounded-tl-md rounded-tr-md hidden" >
                <div className="flex ml-1 flex-1">
                    <ul className="actions-container" role="toolbar">
                    </ul>
                </div>
                <div className="py-1 text-center text-ellipsis overflow-hidden" >&nbsp;</div>
                <div className="flex ml-1 flex-1">
                    <ul className="actions-container" role="toolbar">
                    </ul>
                </div>
            </div>
            <div className="flex pt-2 p-1 w-full">

                <div className="flex flex-col grow min-w-0 relative">
                    <div className="grow flex relative">
                        <div className="grow ">
                            <div className="relative">
                                <div className="bg-[#2b303b] text-[#d5ced9] text-[12px] w-full border relative block p-0 rounded-sm border-[#444a57]" >
                                    <div className="relative w-full h-full flex p-1 items-center ">
                                        {
                                            groupCommand != "action" ?
                                                <span className='h-full text-center'>
                                                    {groupCommand == "variable" ?
                                                        (
                                                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" style={{ borderRadius: 2 }}></polygon></svg>

                                                        ) :
                                                        (
                                                            <svg className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.6418 20 15.1681 19.5054 16.4381 18.6571L17.5476 20.3214C15.9602 21.3818 14.0523 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V13.5C22 15.433 20.433 17 18.5 17C17.2958 17 16.2336 16.3918 15.6038 15.4659C14.6942 16.4115 13.4158 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.1258 7 14.1647 7.37209 15.0005 8H17V13.5C17 14.3284 17.6716 15 18.5 15C19.3284 15 20 14.3284 20 13.5V12ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z"></path></svg>
                                                        )
                                                    }
                                                </span> :
                                                (
                                                    <svg className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z" /></svg>
                                                )
                                        }

                                        <input id="commandInput" autoFocus={true} autoComplete="off" className="bg-inherit flex-1 w-[calc(100%-0px)] inline-block h-full  border-none resize-none px-1 py-[6px] text-ellipsis " autoCorrect="off" autoCapitalize="off" spellCheck="false" type="text"
                                            placeholder={`Search ${groupCommand === "action" ? "actions" : groupCommand == "variable" ? "variables" : "functions"} by name `} name='command'
                                            value={searchValue}
                                            onChange={(e) => handleSearch(e)}
                                            onKeyDown={(e) => handlebackspace(e as unknown as KeyboardEvent)}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="monaco-progress-container quick-input-progress done" role="progressbar" >
                <div className="progress-bit" ></div>
            </div>
            <div className="h-full">
                <div className="max-h-[402px] overflow-auto commands_overflow pb-1 outline-0 groupCommand-none relative w-full h-full whitespace-nowrap" tabIndex={0} role="listbox" aria-label="Quick Input" data-keybinding-context="88" id="quickInput_list" aria-activedescendant="list_id_29_0">
                    <div id="commandTap" className="relative overflow-hidden min-h-[200px] py-0 px-2 h-full groupCommand-none whitespace-nowrap " role="presentation">
                        {showShadow && <div className='h-[1px] w-full' id='shadowDiv' style={{ boxShadow: "0 0 8px 2px #14151abd" }} />}
                        {
                            groupCommand === "action" && <ActionsComands onNodeClick={handleNodeClick} />
                        }
                        {
                            groupCommand === "variable" && <VariableComands onNodeClick={handleNodeClick} />
                        }
                        {
                            groupCommand === "function" && <FunctionsComands onNodeClick={handleFunctionClick} />
                        }
                    </div>
                </div>
            </div>


        </>
    );
}

function selectNode(toReturn: boolean = false) {

    return new Promise((resolve, reject) => {
        function handleSelected(Nodename: string, data?: Record<string, any>) {
            resolve({ action: "create", Nodename, data });
        }
        function handleFunction() {

        }
        function onVariable(Nodename: string, data?: Record<string, any>) {
            resolve({ action: "create", Nodename, data });
        }
        function handleCancel() {
            resolve({ action: "cancel" });
        }

        const modal = <ConfirmModal onFunction={handleFunction} toReturn={toReturn} onValue={onVariable} selectedNode={handleSelected} onCancel={handleCancel} />;
        ReactDOM.render(modal, document.getElementById('commands'));

    })


}


export default selectNode