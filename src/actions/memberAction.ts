import resourcesAPI from "../api";
export async function getMembersOfProject(projectName: string) {
    const response = await resourcesAPI.get(`/project/${projectName}/member`);
    return response.data;
}
export async function markTask(taskId: string, status: string) {
    const response = await resourcesAPI.put(`/task/${taskId}`, { status });
    return response.data;
}
export async function assignTask(taskId: string, memberId: string) {
    const response = await resourcesAPI.patch(`/member/${memberId}/assignTask`, { taskId });
    return response.data;
}