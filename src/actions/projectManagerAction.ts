import resourcesAPI from "~/api";
import Project from "~/interfaces/Project";
import ServerResponse from "~/interfaces/ServerResponse";

export async function getProjectOwn(): Promise<ServerResponse<Project[]>> {
    const response = await resourcesAPI.get(`/pm/project`);
    return response.data;
}