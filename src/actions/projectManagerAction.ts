import resourcesAPI from "../api";
export async function getProjectOwn(projectId: string) {
    const response = await resourcesAPI.get(`/pm/${projectId}/project`);
    return response.data;
}