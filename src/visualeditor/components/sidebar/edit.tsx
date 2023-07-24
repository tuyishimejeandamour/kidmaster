import React from 'react'
import { GroupCommands, useUIStore } from '../../store/ui'
import selectNode from '../../../components/commands/select'


export default function SettingsActions() {
    const { openComandModal, setGroupCommand } = useUIStore()
    const handScaleClick = (name: string) => {



    }
    const handleActionClick = async (action: GroupCommands) => {
        setGroupCommand(action)
        openComandModal(true)
        await selectNode()
        openComandModal(false)
    }
    return (
        <div role="tablist" className="flex px-2 rounded-lg py-1 bg-white/5 backdrop-blur-xl items-center" data-focuszone-id="FocusZone38">
            <div className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-sm text-center flex items-center justify-center text-gray-500' onClick={() => handleActionClick("variable")}>
                <svg className="h-4 left-[2px] w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" style={{ borderRadius: 2 }}></polygon></svg>
            </div>
            <div className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-sm text-center flex items-center justify-center text-gray-500' onClick={() => handleActionClick("function")}>@</div>
            <div className='flex flex-1 items-center'>
                <div className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-base text-center flex items-center justify-center text-gray-500'>+</div>
                <div className='px-1  text-gray-500 font-semibold text-xs'>100%</div>
                <div className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-base text-center flex items-center justify-center text-gray-500'>-</div>
            </div>

        </div>
    )
}
