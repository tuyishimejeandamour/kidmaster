import { toast as Message } from "react-toastify";
import { useMemoizedFn } from "ahooks";
import Konva from "konva";
import { useEffect, useRef } from "react";
import { useNodeStore, useStageStore } from "@/visualeditor";

function Toolbar() {
  const nodeCreatedPosRef = useRef<Konva.Vector2d | null>(null);
  const { nodeDefinition, createNode } = useNodeStore();
  const { getRelativePointerPosition } = useStageStore();

  useEffect(() => {
    nodeCreatedPosRef.current = getRelativePointerPosition();
  }, []);

  const handleCreateNode = useMemoizedFn(
    (nodeName: string, data?: Record<string, any>) => {
      if (!nodeName) {
        Message.error('Node Name undefined');
        return;
      }

      if (!nodeCreatedPosRef.current) {
        Message.error('Cannot get pointer position');
        return;
      }

      createNode(nodeName, nodeCreatedPosRef.current, data);
    }
  );
  return (
    <ul data-tauri-drag-region className="flex  w-full  justify-center list-none">
      <li onClick={() => handleCreateNode("fetch")} className="w-11 h-11 flex items-center  hover:cursor-pointer hover:bg-[#34383b] justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5  text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10"></circle></svg>      </li>
      <li className="w-11 h-11 flex items-center  hover:cursor-pointer hover:bg-[#34383b] justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5  text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>      </li>
      <li className="w-11 h-11 flex items-center  hover:cursor-pointer hover:bg-[#34383b] justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  text-white" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z" /></svg>
      </li>
      <li className="w-11 h-11 flex items-center  hover:cursor-pointer hover:bg-[#34383b] justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  text-white" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z" /></svg>
      </li>
      <li className="w-11 h-11 flex items-center hover:cursor-pointer hover:bg-[#34383b] justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  text-white" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z" /></svg>
      </li>
    </ul>
  )
}


export default Toolbar