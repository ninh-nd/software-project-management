import create from "zustand";
import { getProjectOwn } from "~/actions/projectManagerAction";

interface ProjectStore {
  currentProject: string;
  actions: {
    setCurrentProject: (project: string) => void;
  };
}
const useProjectStore = create<ProjectStore>((set) => {
  getProjectOwn().then((data) => set({ currentProject: data.data[0].name }));
  return {
    currentProject: "",
    actions: {
      setCurrentProject: (project: string) => {
        set({ currentProject: project });
      },
    },
  };
});
export const useProjectHook = () =>
  useProjectStore((state) => state.currentProject);
export const useProjectActions = () =>
  useProjectStore((state) => state.actions);
