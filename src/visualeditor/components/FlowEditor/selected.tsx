import {useNodeInfo} from '../../hooks/useNodeInfo';
import {PositionsBase} from '../../nodes/components/sideEditor/positionsBase';
import useModifierRender from '../../nodes/hooks/useModifierRender';
import {useUIStore} from '../../store/ui';
import {ColorEditorBase} from '../../nodes/components/sideEditor/colorBase';
import BlueToothPanel from "@/visualeditor/components/sidebar/bluetooth/bluetoothPanel";

export default function Selected() {

    const {selectedNodeIds, showBluetoothDevices, setShowBluetoothDevices, setShowSideEditor} = useUIStore();
    const {node, definition} = useNodeInfo(selectedNodeIds[0])
    let ui = useModifierRender(node, definition)

    function handleBluetoothScan() {
        setShowBluetoothDevices(true)
    }

    return (
        <div className='bg-transparent'>
            <div className='w-full'>
                <div className="px-4 ">
                    <div className="py-3 flex items-center justify-start gap-2 ">
            <span onClick={() => setShowSideEditor(false)} className='rounded p-[2px] cursor-pointer bg-gray-400'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4  text-gray-300" fill="currentcolor"
                     viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                    d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>
            </span>
                        {
                            showBluetoothDevices &&
                            <div className={"flex flex-1 items-center justify-between"}>
                                <span
                                    className="font-semibold capitalize text-gray-300 truncate">Bluetooth Devices</span>
                                <div onClick={handleBluetoothScan}
                                     className="flex  justify-center items-center bg-blue-500/50 h-8 w-11 rounded-lg text-sm shadow-sm shadow-blue-700 text-white hover:border-transparent hover:cursor-pointer">
                                    <svg className='h-5 w-5 fill-white' xmlns="http://www.w3.org/2000/svg" width="24"
                                         height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M14.3113 12L18.6544 16.3431L12.9976 22H10.9976V15.3137L6.63359 19.6777L5.21938 18.2635L10.9976 12.4853V11.5147L5.21938 5.73654L6.63359 4.32233L10.9976 8.68629V2H12.9976L18.6544 7.65685L14.3113 12ZM12.9976 13.5147V19.1716L15.826 16.3431L12.9976 13.5147ZM12.9976 10.4853L15.826 7.65685L12.9976 4.82843V10.4853ZM19.5 13.5C18.6716 13.5 18 12.8284 18 12C18 11.1716 18.6716 10.5 19.5 10.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5ZM6.5 13.5C5.67157 13.5 5 12.8284 5 12C5 11.1716 5.67157 10.5 6.5 10.5C7.32843 10.5 8 11.1716 8 12C8 12.8284 7.32843 13.5 6.5 13.5Z"></path>
                                    </svg>
                                </div>
                            </div>
                        }
                        {!showBluetoothDevices &&
                            <span className="text-gray-300 font-semibold capitalize truncate">{node?.name}</span>}
                    </div>
                </div>
            </div>
            <>
                {showBluetoothDevices && <BlueToothPanel/>}
            </>
            <>
                {!showBluetoothDevices && <>
                    {ui}
                    {

                        node &&
                        <>
                            <PositionsBase
                                key={"posit"}
                            />
                            <ColorEditorBase
                                definition={definition || undefined}
                            />
                        </>
                    }
                </>
                }
            </>
        </div>
    )
}
