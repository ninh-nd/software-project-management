import resourcesAPI from "~/api";
import Project from "~/interfaces/Project";
import ServerResponse from "~/interfaces/ServerResponse";
interface I {
    projects: Project[];
}
export async function getProjectOwn(projectId: string): Promise<ServerResponse<I>> {
    const response = await resourcesAPI.get(`/pm/${projectId}/project`);
    return response.data;
}