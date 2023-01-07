import resourcesAPI from '~/api'
import { IPhase } from '~/interfaces/Phase'
import { IPhasePreset } from '~/interfaces/PhasePreset'
import { IResponse } from '~/interfaces/ServerResponse'
export async function addTaskToPhase(phaseId: string, taskId: string): Promise<IResponse<IPhase>> {
    const response = await resourcesAPI.patch(`/phase/${phaseId}/task/add`, { taskId })
    return response.data
}
export async function removeTaskFromPhase(phaseId: string, taskId: string): Promise<IResponse<IPhase>> {
    const response = await resourcesAPI.patch(`/phase/${phaseId}/task/delete`, { taskId })
    return response.data
}
export async function getPhasePresets(): Promise<IResponse<IPhasePreset[]>> {
    const response = await resourcesAPI.get(`/phase/presets`)
    return response.data
}