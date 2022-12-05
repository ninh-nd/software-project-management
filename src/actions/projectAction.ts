import resourcesAPI from "~/api";
import Project from "~/interfaces/Project";
import ServerResponse from "~/interfaces/ServerResponse";
export async function getProjectInfo(projectName: string): Promise<ServerResponse<Project>> {
    const response = await resourcesAPI.get(`/project/${projectName}`);
    return response.data;
}