import resourcesAPI from '../api';
export async function addTaskToPhase(phaseId: string, taskId: string) {
    const response = await resourcesAPI.patch(`/phase/${phaseId}/task`, { taskId });
    return response.data;
}