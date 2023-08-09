import { useNodeInfo } from '../../hooks/useNodeInfo';
import { PositionsBase } from '../../nodes/components/sideEditor/positionsBase';
import useModifierRender from '../../nodes/hooks/useModifierRender';
import { useUIStore } from '../../store/ui';
import { ColorEditorBase } from '../../nodes/components/sideEditor/colorBase';
import BlueToothPanel from "@/visualeditor/components/sidebar/bluetooth/bluetoothPanel";

export default function Selected() {

  const { selectedNodeIds,showBluetoothDevices,setShowSideEditor } = useUIStore();
  const { node, definition } = useNodeInfo(selectedNodeIds[0])
  let ui = useModifierRender(node, definition)

  const handlePositionChange = (data: string, key: string) => {
  }
  const handleColorChange = (color: string, key: string) => {
  }
  return (
    <div className='bg-transparent'>
      <div className='w-full'>
        <div className="px-4 ">
          <div className="py-3 flex items-center justify-start gap-2 ">
            <span onClick={() => setShowSideEditor(false)} className='rounded p-[2px] cursor-pointer bg-gray-400/40'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4  text-gray-600" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" /></svg>
            </span>
              {
                  showBluetoothDevices && <span className="text-gray-800 font-semibold capitalize truncate">Bluetooth Devices</span>
              }
              {   !showBluetoothDevices &&<span className="text-gray-800 font-semibold capitalize truncate">{node?.name}</span>}
          </div>
        </div>
      </div>
      <>
        {showBluetoothDevices && <BlueToothPanel />}
      </>
      <>
        {!showBluetoothDevices &&<>
      {ui}
      {

        node &&
        <>
          <PositionsBase
            key={"posit"}
            x={node.position.x}
            y={node.position.y}
            height={definition?.width}
            width={definition?.height}
            onChange={handlePositionChange}

          />
          <ColorEditorBase
          background='#dde'
          header='#ccc'
          onChange={handleColorChange}
          />
        </>
      }
        </>
        }
      </>
    </div>
  )
}
