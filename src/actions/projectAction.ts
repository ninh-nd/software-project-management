import resourcesAPI from "~/api"
import { IProject } from "~/interfaces/Project"
import { IResponse } from "~/interfaces/ServerResponse"
export async function getProjectInfo(projectName: string): Promise<IResponse<IProject>> {
    const response = await resourcesAPI.get(`/project/${projectName}`)
    return response.data
}