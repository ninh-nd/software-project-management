import resourcesAPI from "../api";
export async function getMembersOfProject(projectName: string) {
    const response = await resourcesAPI.get(`/project/${projectName}/member`);
    return response;
}
export async function markTask(taskId: string, status: string) {
    const response = await resourcesAPI.put(`/task/${taskId}`, { status });
    return response;
}
export async function assignTask(taskId: string, memberId: string) {
    const response = await resourcesAPI.patch(`/member/${memberId}/task`, { taskId });
    return response;
}