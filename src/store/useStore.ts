import create from 'zustand';
import Project from '~/interfaces/Project';
import axios from '~/api'
interface ProjectState {
    currentProject: string;
    projectList: Project[];
    setCurrentProject: (projectName: string) => void;
    setProjectList: (projectList: Project[]) => void;
    fetch: () => Promise<void>;
}
const useProjectStore = create<ProjectState>()((set) => ({
    currentProject: '',
    projectList: [],
    setCurrentProject: (projectName: string) => set({ currentProject: projectName }),
    setProjectList: (projectList: Project[]) => set({ projectList: projectList }),
    fetch: async () => {
        const id = localStorage.getItem('id');
        const projectList = await axios.get(`/pm/${id}/project`);
        const data = projectList.data.data;
        set({ projectList: data.projects });
        set({ currentProject: data.projects[0].name });
    }
}));
export default useProjectStore;