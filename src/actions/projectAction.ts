import resourcesAPI from "~/api";
export async function getProjectInfo(projectName: string) {
    const response = await resourcesAPI.get(`/project/${projectName}`);
    return response.data;
}