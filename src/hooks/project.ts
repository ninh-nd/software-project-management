import create from "zustand";

interface ProjectStore {
    currentProject: string;
    actions: {
        setCurrentProject: (project: string) => void;
    }
}
const useProjectStore = create<ProjectStore>((set) => {
    return {
        currentProject: '',
        actions: {
            setCurrentProject: (project: string) => {
                set({ currentProject: project });
            }
        }
    }
})
export const useProjectHook = () => useProjectStore((state) => state.currentProject);
export const useProjectActions = () => useProjectStore((state) => state.actions);