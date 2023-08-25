import React, {
  PropsWithChildren
} from 'react';
import { Message, Trigger } from '@arco-design/web-react';
import { clipboard } from 'electron';

import { useConnectionStore } from '@/visualeditor';
import { GroupCommands, useUIStore } from '../store/ui';
import selectNode from '../../components/commands/select';
import { useNodeInfo } from '../hooks/useNodeInfo';
import { useNodeStore } from '../store/node';


const ContextMenu: React.FC = React.memo(() => {

  const { selectedNodeIds,showBluetoothDevices, showSideEditor,setActiveSpace, contextMenu, setShowSideEditor, deleteAllSelected,setShowBluetoothDevices, setShowPopup, openCommandModal, setGroupCommand } = useUIStore()
  const data = useNodeInfo(selectedNodeIds[0])
  const { createNode, resetNode } = useNodeStore()


  const handleCreateNode = async (action: GroupCommands = "action") => {
    setShowPopup(false)
    setGroupCommand(action)
    openCommandModal(true)
    await selectNode()
    openCommandModal(false)
  }
  const handleCopyNode = async () => {
    setShowPopup(false)
    if (data.definition && data.node) {
      const node = JSON.stringify({ name: data.definition?.name, position: data.node?.position, data: data.node?.data })
      clipboard.writeText(node)
      Message.success("copied")
      return
    }
    Message.error("copying unfinished")
  }

  const pasteNode = async () => {
    setShowPopup(false)
    const nodeInfo = JSON.parse(clipboard.readText() as string)
    if (nodeInfo) {
      createNode(nodeInfo.name, nodeInfo.position, nodeInfo.data)
      return
    }
    Message.error("Error pasting")
  }

  const handleDelNode = () => {
    setShowPopup(false)
    deleteAllSelected();
    return
  }
  const handleDelAll = async () => {
    setShowPopup(false)
    const nodeInfo = confirm("Do you want to Delete All Nodes")
    if (nodeInfo) {
      resetNode();
    }
    return
  }
  return (
    <div
      style={{
        width: 220,
        boxShadow: "rgb(172 174 189 / 71%) 0px 0px 31px -8px"
      }}
      className='rounded bg-gray-50 p-1 text-black'

    >
      {
        contextMenu === "node" && (
          <ul className='w-full'>
            {
              selectedNodeIds[0] && selectedNodeIds[0].includes("group") && (
                <li className='w-full bg-transparent select-none h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => {
                  setShowPopup(false)
                  setActiveSpace('group',selectedNodeIds[0])
  
                }}>
                  <div className='flex-1 text-[12px] capitalize select-none ' >open</div>
                  <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                    <span>ctrl</span>
                    <span>+</span>
                    <span>e</span>
                  </div>
                </li>
              )
            }
            {
                (!showSideEditor || (showBluetoothDevices && showSideEditor)) &&
              <li className='w-full bg-transparent select-none h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => {
                setShowPopup(false)
                setShowSideEditor(true)
                setShowBluetoothDevices(false)
              }}>
                <div className='flex-1 text-[12px] capitalize select-none ' >Edit</div>
                <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                  <span>ctrl</span>
                  <span>+</span>
                  <span>e</span>
                </div>
              </li>
            }
            {
              selectedNodeIds[0] != "$begin"&& selectedNodeIds[0] != "groubBegin" && (
                <li className='w-full bg-transparent select-none h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => handleCopyNode()}>
                  <div className='flex-1 text-[12px] capitalize select-none ' >Copy</div>
                  <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                    <span>ctrl</span>
                    <span>+</span>
                    <span>c</span>
                  </div>
                </li>
              )}
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 '>
              <div className='flex-1 text-[12px] capitalize select-none '>Personalize</div>
              <div className='w-auto'></div>
            </li>
            {
              selectedNodeIds[0] != "$begin" && selectedNodeIds[0] != "groubBegin" && (
                <li className='w-full bg-transparent select-none h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => handleDelNode()}>
                  <div className='flex-1 text-[12px] capitalize select-none ' >Delete</div>
                  <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                    <span>del</span>
                  </div>
                </li>
              )
            }

          </ul>
        )
      }

      {
        contextMenu === "stage" && (
          <ul className='w-full'>
            <li className='w-full bg-transparent select-none h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => handleCreateNode()}>
              <div className='flex-1 text-[12px] capitalize select-none ' >Add Action</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span>ctrl</span>
                <span>+</span>
                <span>p</span>
              </div>
            </li>
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => handleCreateNode('variable')}>
              <div className='flex-1 text-[12px] capitalize select-none '>create variable</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span >ctrl</span>
                <span>+</span>
                <span>shift</span>
                <span>+</span>
                <span >P</span>
              </div>
            </li>
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={() => handleCreateNode('function')}>
              <div className='flex-1 text-[12px] capitalize select-none '>create function</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span >ctrl</span>
                <span>+</span>
                <span>n</span>
              </div>
            </li>
            <li className='h-[1px] bg-gray-300/90 my-2' />
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={pasteNode}>
              <div className='flex-1 text-[12px] capitalize select-none '>paste</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span >ctrl</span>
                <span>+</span>
                <span >v</span>
              </div>
            </li>
            <li className='h-[1px] bg-gray-300/90 my-2' />

            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 '>
              <div className='flex-1 text-[12px] capitalize select-none '>upload</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span >ctrl</span>
                <span>+</span>
                <span >n</span>
              </div>
            </li>
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 '>
              <div className='flex-1 text-[12px] capitalize select-none '>run</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span >f9</span>
              </div>
            </li>
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 '>
              <div className='flex-1 text-[12px] capitalize select-none '>compile</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span >f5</span>
              </div>
            </li>
            <li className='h-[1px] bg-gray-300/90 my-2' />
            <li className='w-full bg-transparent h-7 px-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300/50 ' onClick={handleDelAll}>
              <div className='flex-1 text-[12px] capitalize select-none '>clear All</div>
              <div className='w-auto flex items-center justify-center px-1 text-[11px]'>
                <span ></span>
              </div>
            </li>
          </ul>
        )
      }


    </div>
  );
});
ContextMenu.displayName = 'ContextMenu';

interface ContextMenuWrapperProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}
export const ContextMenuWrapper = React.forwardRef<
  HTMLDivElement,
  ContextMenuWrapperProps
>((props, ref) => {
  const { showPopup, setShowPopup, setContextMenu } = useUIStore()
  const workingConnection = useConnectionStore(
    (state) => state.workingConnection
  );


  return (
    <Trigger
      popup={() => <ContextMenu />}
      alignPoint={true}
      escToClose={true}
      popupVisible={showPopup}
      onVisibleChange={(v) => {
        setShowPopup(v)
      }
      }

      position="bl"
      popupAlign={{
        bottom: 8,
        left: 8,
      }}
      trigger={['contextMenu']}
      disabled={!!workingConnection}
    >
      <div className={props.className} style={props.style} ref={ref}>
        {props.children}
      </div>
    </Trigger>
  );
});
ContextMenuWrapper.displayName = 'ContextMenuWrapper';
