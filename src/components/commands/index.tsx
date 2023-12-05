import React, {useEffect} from 'react'
import {useUIStore} from '@/visualeditor';
import selectNode from './select';

const CommandPanel: React.FC = () => {
    const {openCommand, openCommandModal, setGroupCommand} = useUIStore()
    // const {handleCreateNode} = useNodes()

    const handleKeys = async (ev: KeyboardEvent) => {
        ev.preventDefault()
        if (ev.ctrlKey && ev.shiftKey && ev.key == "P") {
            setGroupCommand("variable")
            openCommandModal(true)
            const data = await selectNode()
            openCommandModal(false)

        } else {
            if (ev.ctrlKey && !ev.shiftKey && ev.key == "p") {
                setGroupCommand("action")
                openCommandModal(true)
                const data = await selectNode()
                openCommandModal(false)
            }


            if (ev.key == "Escape") {
                openCommandModal(false)
            }
        }

    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeys);
        document.getElementById("commandInput")?.focus()

        return () => {
            window.removeEventListener("keydown", handleKeys)
        }
    }, []);


    return (
        <>
            <div id='commands'
                 className={`bg-[#20232a] pb-2 px-1 top-10 absolute w-[400px] md:w-[590px] xl:w-[590px] z-50 left-1/2 md:-ml-[297.6px] xl:-ml-[297.6px] -ml-60 rounded-md ${openCommand ? "block" : "hidden"}`}
                 style={{boxShadow: "0 0 8px 2px #14151abd"}} tabIndex={-1}>
            </div>
        </>
    );
}


export default CommandPanel