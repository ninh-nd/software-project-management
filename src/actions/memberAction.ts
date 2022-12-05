import resourcesAPI from "~/api";
import Member from "~/interfaces/Member";
import ServerResponse from "~/interfaces/ServerResponse";
import { TaskUpdate } from "~/interfaces/Task";
export async function getMembersOfProject(projectName: string): Promise<ServerResponse<Member[]>> {
    const response = await resourcesAPI.get(`/project/${projectName}/member`);
    return response.data;
}
export async function markTask(taskIdArray: string[], status: string) {
    taskIdArray.forEach(async (taskId) => {
        await resourcesAPI.put(`/task/${taskId}`, { status });
    })
}
export async function assignTask(taskId: string, memberId: string): Promise<ServerResponse<Member>> {
    const response = await resourcesAPI.patch(`/member/${memberId}/assignTask`, { taskId });
    return response.data;
}