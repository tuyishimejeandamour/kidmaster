import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export interface ProjectStory {
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
}

export interface ProjectCategory {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface AppState {
    onDashboard: boolean;
    activeSection: string;
    showSidebar: boolean;
    projects: Array<ProjectStory>;
    projectCategories: Array<ProjectCategory>;
    setOnDashboard: (state: boolean) => void;
    setActiveSection: (state: string) => void;
    setShowSidebar: (state: boolean) => void;
    setProjects: (state: Array<ProjectStory>) => void;
    addProject: (state: ProjectStory) => void;

}

export const useAppStore = create<AppState>()(
    immer((set, get) => ({
        onDashboard: true,
        showSidebar: false,
        projects: [],
        projectCategories: [],
        activeSection: "actions",
        setOnDashboard: (value: boolean) => {
            set((state) => {
                state.onDashboard = value
            })
        },
        setActiveSection: (value: string) => {
            set((state) => {
                state.activeSection = value
            })
        },
        setShowSidebar: (value: boolean) => {
            set((state) => {
                state.showSidebar = value
            })
        },
        setProjects: (value: Array<ProjectStory>) => {
            set((state) => {
                state.projects = value
            })
        },
        addProject: (value: ProjectStory) => {
            set((state) => {
                state.projects.push(value)
            })
        }
    }))
);
