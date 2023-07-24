import React, { useState } from 'react';
import Actions from './actions';
import Devices from './devices';
import Projects from './projects';
//mport './Sidebar.css';
import { useAppStore } from '../../../store/app';
import SidebarHeader from './sideBarHeader';
import { useUIStore } from '../..';
import ActionsComands from '../../../components/commands/actions';
import FunctionsComands from '../../../components/commands/function';
import VariableComands from '../../../components/commands/variable';
import { useNodes } from '../../../hooks/useNodes';

const Sidebar = () => {
    const { activeSection, setActiveSection } = useAppStore();
    const { handleCreateNode } = useNodes()
    const { groupCommand, setGroupCommand } = useUIStore()

    const handleNodeClick = (nodeName: string, data?: Record<string, any>) => {
        handleCreateNode(nodeName, data)
    }
    const handleFunctionClick = () => {

    }
    return (
        <div className="flex  left-0 w-full bg-transparent h-full text-white transition-all duration-300 border-none z-10 sidebar rounded">
            <div className="flex flex-col items-center justify-center w-[62px]  bg-transparent  whitespace-nowrap">
                <div className='w-14 flex flex-col py-1 gap-1  items-center rounded-md bg-white/5 backdrop-blur-xl  mt-1 mb-1 h-full shadow-xl drop-shadow-xl'>
                    <button onClick={() => setGroupCommand("action")} className={`inline-flex items-center w-14 h-9 rounded-tl rounded-bl  text-xs text-center  bg-transparent border-l-4  ${groupCommand.includes("action") ? "text-blue-500 border-blue-500" : "text-gray-500  border-transparent"}    whitespace-nowrap cursor-base focus:outline-none hover:text-blue-400 hover:border-blue-400`}>
                        <span className='w-full flex justify-center items-center rounded h-full '>
                            <svg className="h-[22px] w-[22px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z" /></svg>
                        </span>
                    </button>
                    <button onClick={() => setGroupCommand("variable")} className={`inline-flex items-center rounded-tl rounded-bl w-14 h-9 text-xs text-center bg-transparent border-l-4  ${groupCommand.includes("variable") ? "text-blue-500 border-blue-500" : "text-gray-500  border-transparent"}   whitespace-nowrap cursor-base focus:outline-none hover:text-blue-400 hover:border-blue-400`}>
                        <span className='w-full flex justify-center items-center rounded h-full'>
                            <svg className="h-[22px] w-[22px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" style={{ borderRadius: 2 }}></polygon></svg>
                        </span>
                    </button>
                    <button onClick={() => setGroupCommand("function")} className={`inline-flex items-center rounded-tl rounded-bl  w-14 h-9 text-xs text-center ${groupCommand.includes("fun") ? "text-blue-500 border-blue-500" : "text-gray-500  border-transparent"}  bg-transparent border-l-4    whitespace-nowrap focus:outline-none hover:text-blue-400 hover:border-blue-400`}>
                        <span className='w-full flex justify-center items-center rounded h-full'>
                            Fun
                        </span>
                    </button>

                </div>
            </div>
            <div className='flex-1 w-full h-full flex flex-col overflow-y-auto devices'>
                <div className='flex-1 w-full'>
                    <SidebarHeader />
                    <>
                        {
                            groupCommand === "action" && <ActionsComands onNodeClick={handleNodeClick} />
                        }
                        {
                            groupCommand === "variable" && <VariableComands onNodeClick={handleNodeClick} />
                        }
                        {
                            groupCommand === "function" && <FunctionsComands onNodeClick={handleFunctionClick} />
                        }
                     </>
                    </div>
                </div>
            </div>

    );
}

export default Sidebar;