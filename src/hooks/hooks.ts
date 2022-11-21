import create from 'zustand';
import Project from '~/interfaces/Project';
import axios from '~/api'
interface ProjectState {
    currentProject: string;
    projectList: Project[];
    actions: {
        setCurrentProject: (projectName: string) => void;
        setProjectList: (projectList: Project[]) => void;
        fetch: () => Promise<void>;
    }
}
const useStore = create<ProjectState>()((set) => ({
    currentProject: '',
    projectList: [],
    actions: {
        setCurrentProject: (projectName: string) => set({ currentProject: projectName }),
        setProjectList: (projectList: Project[]) => set({ projectList: projectList }),
        fetch: async () => {
            const id = localStorage.getItem('id');
            const projectList = await axios.get(`/pm/${id}/project`);
            const data = projectList.data.data;
            set({ projectList: data.projects });
            set({ currentProject: data.projects[0].name });
        }
    }
}));
export const useCurrentProject = () => useStore((state) => state.currentProject);
export const useProjectList = () => useStore((state) => state.projectList);
export const useProjectActions = () => useStore((state) => state.actions);