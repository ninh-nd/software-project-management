import { AxiosResponse } from "axios";
import resourcesAPI from "../api";
export async function getMembersOfProject(projectName: string) {
    const response = await resourcesAPI.get(`/project/${projectName}/member`);
    return response.data;
}
export async function markTask(taskIdArray: string[], status: string) {
    taskIdArray.forEach(async (taskId) => {
        await resourcesAPI.put(`/task/${taskId}`, { status });
    })
}
export async function assignTask(taskId: string, memberId: string) {
    const response = await resourcesAPI.patch(`/member/${memberId}/assignTask`, { taskId });
    return response.data;
}