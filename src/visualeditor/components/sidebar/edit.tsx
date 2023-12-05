import React from 'react'
import {GroupCommands, useUIStore} from '../../store/ui'
import selectNode from '../../../components/commands/select'


export default function SettingsActions() {
    const {openCommandModal, setShowBluetoothDevices, setShowSideEditor, setGroupCommand} = useUIStore()
    const handScaleClick = (name: string) => {


    }
    const handleActionClick = async (action: GroupCommands) => {
        setGroupCommand(action)
        openCommandModal(true)
        await selectNode()
        openCommandModal(false)
    }
    return (
        <div role="tablist" className="flex px-2 rounded-lg py-1 bg-white/5 backdrop-blur-xl items-center"
             data-focuszone-id="FocusZone38">
            <div
                className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-sm text-center flex items-center justify-center text-gray-500'
                onClick={() => handleActionClick("variable")}>
                <svg className="h-4 left-[2px] w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" style={{borderRadius: 2}}></polygon>
                </svg>
            </div>

            <div
                className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-sm text-center flex items-center justify-center text-gray-500'
                onClick={() => handleActionClick("function")}>@
            </div>
            <div className='flex flex-1 items-center'>
                <div
                    className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-base text-center flex items-center justify-center text-gray-500'>+
                </div>
                <div className='px-1  text-gray-500 font-semibold text-xs'>100%</div>
                <div
                    className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-base text-center flex items-center justify-center text-gray-500'>-
                </div>
            </div>
            <div onClickCapture={() => {
                setShowSideEditor(true)
                setShowBluetoothDevices(true)
            }}
                 className='w-6 h-6 hover:bg-gray-300/50 cursor-pointer rounded-sm text-sm text-center flex items-center justify-center text-gray-500'>
                <svg className="h-4 left-[2px] fill-white w-4 stroke-white/50" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                    <path
                        d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM6 7C5.44772 7 5 7.44772 5 8V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V8C19 7.44772 18.5523 7 18 7H13H11H6ZM2 10H0V16H2V10ZM22 10H24V16H22V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5Z"></path>
                </svg>
            </div>
        </div>
    )
}
