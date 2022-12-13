import create from 'zustand';
import Project from '~/interfaces/Project';
import axios from '~/api'
interface ProjectState {
    projectList: Project[];
    actions: {
        setProjectList: (projectList: Project[]) => void;
        fetch: () => Promise<void>;
    }
}
const useStore = create<ProjectState>()((set) => ({
    projectList: [],
    actions: {
        setProjectList: (projectList: Project[]) => set({ projectList: projectList }),
        fetch: async () => {
            const id = localStorage.getItem('id');
            const projectList = await axios.get(`/pm/${id}/project`);
            const data = projectList.data.data;
            set({ projectList: data.projects });
        }
    }
}));
export const useProjectList = () => useStore((state) => state.projectList);
export const useProjectActions = () => useStore((state) => state.actions);