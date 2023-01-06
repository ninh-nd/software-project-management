import resourcesAPI from "~/api"
import { IPhaseCreate } from "~/interfaces/PhasePreset"
import { IProject } from "~/interfaces/Project"
import { IResponse } from "~/interfaces/ServerResponse"
export async function getProjectInfo(projectName: string): Promise<IResponse<IProject>> {
    const response = await resourcesAPI.get(`/project/${projectName}`)
    return response.data
}
export async function createPhaseModel(projectName: string, model: IPhaseCreate[]) {
    const response = await resourcesAPI.post(`/project/${projectName}`, {
        phases: model
    })
    return response
}