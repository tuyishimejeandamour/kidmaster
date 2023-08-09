import { uniq, without } from 'lodash-es';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useConnectionStore } from './connection';
import { useNodeStore } from './node';

export type GroupCommands = "function" | "variable" | "action"
export type Space = "function" | "group" | "main";
export type ContextMenu = "node"|"group"|"stage"
export interface ActiveSpace{
  space:Space,
  name:string
}
interface UIState {
  selectedNodeIds: string[];
  selectedConnectionIds: string[];
  showBluetoothDevices: boolean;
  openCommand: boolean;
  showSideEditor: boolean;
  activeCategory:string;
  groupCommand: GroupCommands;
  showPopup:boolean;
  searchValue:string;
  activeSpace:ActiveSpace;
  contextMenu:ContextMenu
  search: (value:string) => void;


  addSelectedNodes: (nodeIds: string[]) => void;
  switchSelectNodes: (nodeIds: string[]) => void;
  addSelectedConnections: (connectionIds: string[]) => void;
  /**
   * 清除选中状态
   */
  clearSelectedStatus: () => void;
  /**
   * 删除选中节点和连线
   */
  deleteAllSelected: () => void;
  /**
   * 移动所有选中
   */
  moveSelected: (deltaX: number, deltaY: number) => void;
  openCommandModal: (state: boolean, ref?:any) => void;
  setShowSideEditor: (state: boolean) => void;
  setGroupCommand:(group:GroupCommands)=>void;
  setShowPopup: (state:boolean) => void;
  setContextMenu: (state:ContextMenu) => void
  setActiveSpace:(space:Space,name:string) => void;
  setActiveCategory:(category:string) => void;
  setShowBluetoothDevices: (state: boolean) => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    selectedNodeIds: [] as string[],
    selectedConnectionIds: [] as string[],
    openCommand: false,
    showSideEditor: window.innerWidth < 700,
    groupCommand:'action',
    showPopup:false,
    searchValue:"",
    activeCategory:"all",
    activeSpace:{space:'main',name: "main"},
    contextMenu:"stage",
    showBluetoothDevices: false,
    addSelectedNodes: (nodeIds) => {
      set((state) => {
        state.selectedNodeIds = uniq([...state.selectedNodeIds, ...nodeIds]);
      });
    },
    switchSelectNodes: (nodeIds) => {
      set((state) => {
        if (
          nodeIds.length === 1 &&
          [...state.selectedNodeIds].includes(nodeIds[0])
        ) {
          state.selectedNodeIds = without(state.selectedNodeIds, nodeIds[0]);
        } else {
          state.selectedNodeIds = uniq([...state.selectedNodeIds, ...nodeIds]);
        }
      });
    },
    addSelectedConnections: (connectionIds) => {
      set((state) => {
        if (
          connectionIds.length === 1 &&
          state.selectedConnectionIds.includes(connectionIds[0])
        ) {
          state.selectedConnectionIds = without(
            state.selectedConnectionIds,
            connectionIds[0]
          );
        } else {
          state.selectedConnectionIds = uniq([
            ...state.selectedConnectionIds,
            ...connectionIds,
          ]);
        }
      });
    },
    clearSelectedStatus: () => {
      set((state) => {
        state.selectedNodeIds = [];
        state.selectedConnectionIds = [];
      });
    },
    deleteAllSelected: () => {
      set((state) => {
        state.selectedConnectionIds.map((id) => {
          useConnectionStore.getState().removeConnection(id);
        });
        state.selectedNodeIds.map((id) => {
          useNodeStore.getState().removeNode(id);
        });

        state.selectedNodeIds = [];
        state.selectedConnectionIds = [];
      });
    },
    moveSelected: (deltaX: number, deltaY: number) => {
      const nodeIds = get().selectedNodeIds;

      nodeIds.forEach((nodeId) => {
        useNodeStore.getState().moveNode(nodeId, deltaX, deltaY);
      });
    },
    openCommandModal: (open: boolean) => {
      set((state) => {
        state.openCommand = open
      })
    },
    setShowSideEditor: (open: boolean) => {
      set((state) => {
        state.showSideEditor = open
      })
    },
    setGroupCommand: (group:GroupCommands)=>{
      set((state) => {
        state.groupCommand = group
      })
    },
    setShowPopup: (open:boolean) => {
      set((state) => {
        state.showPopup = open
      })
    },
    setContextMenu: (open:ContextMenu) => {
      set((state) => {
        state.contextMenu = open
      })
    },
    search: (value:string) => {
      set((state)=> {
        state.searchValue = value
      })
    },
    setActiveSpace: (space:Space,name:string) => {
      set((state)=> {
        state.activeSpace = {space,name}
      })
    },
    setActiveCategory: (category:string) => {
      set((state)=> {
        state.activeCategory = category
      })
    },
    setShowBluetoothDevices: (show: boolean) => {
        set((state) => {
            state.showBluetoothDevices = show;
        })
    }
  }))
);
