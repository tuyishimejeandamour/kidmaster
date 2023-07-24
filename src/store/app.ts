import {create} from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AppState {
    onDashboard:boolean;
    activeSection:string;
    showSidebar:boolean
    setOnDashboard:(state:boolean) => void;
    setActiveSection:(state:string) => void;
    setshowSidebar:(state:boolean) => void;
 
}

export const useAppStore = create<AppState>()(
  immer((set, get) => ({
    onDashboard:true,
    showSidebar:false,
    activeSection: "actions",
    setOnDashboard: (value:boolean) => {
        set((state) => {
            state.onDashboard = value
        })
    },
    setActiveSection: (value:string) => {
        set((state) => {
            state.activeSection = value
        })
    },
    setshowSidebar: (value:boolean) => {
        set((state) => {
            state.showSidebar = value
        })
    }

  }))
);
