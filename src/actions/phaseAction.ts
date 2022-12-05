import resourcesAPI from '~/api';
import Phase from '~/interfaces/Phase';
import ServerResponse from '~/interfaces/ServerResponse';
export async function addTaskToPhase(phaseId: string, taskId: string): Promise<ServerResponse<Phase>> {
    const response = await resourcesAPI.patch(`/phase/${phaseId}/task`, { taskId });
    return response.data;
}