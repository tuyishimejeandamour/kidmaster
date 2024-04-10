import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CodePersistData} from "@/visualeditor/utils/persist";

export interface ProjectStory {
    id: string;
    name: string;
    description: string;
    category: ProjectCategory;
    chime: CodePersistData;
    image: string;
    link: string;
}

export interface ProjectCategory {
    id: string;
    name: string;
    color: string;
    image: string;
}

interface AppState {
    onDashboard: boolean;
    activeSection: string;
    showSidebar: boolean;
    activeCategory: string;
    projects: Array<ProjectStory>;
    currentProject: ProjectStory | null;
    projectCategories: Array<ProjectCategory>;
    setOnDashboard: (state: boolean) => void;
    setActiveSection: (state: string) => void;
    setShowSidebar: (state: boolean) => void;
    setProjects: (state: Array<ProjectStory>) => void;
    addProject: (state: ProjectStory) => void;
    setCurrentProject: (state: ProjectStory) => void;
    setActiveCategory: (state: string) => void;

}

export const useAppStore = create<AppState>()(
    immer((set, get) => ({
        onDashboard: true,
        showSidebar: false,
        projects: [],
        activeCategory: 'history',
        currentProject: null,
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
        },
        setCurrentProject: (value: ProjectStory) => {
            set((state) => {
                state.currentProject = value
            })
        },
        setActiveCategory: (value: string) => {
            set((state) => {
                state.activeCategory = value
            })
        }
    }))

);
