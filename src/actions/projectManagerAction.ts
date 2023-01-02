import resourcesAPI from "~/api"
import { IProject } from "~/interfaces/Project"
import { IResponse } from "~/interfaces/ServerResponse"

export async function getProjectOwn(): Promise<IResponse<IProject[]>> {
    const response = await resourcesAPI.get(`/pm/project`)
    return response.data
}