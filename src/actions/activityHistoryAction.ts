import resourcesAPI from "../api";
export async function getCommits(projectName: string) {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/commit`);
    return response.data;
}
export async function getPullRequests(projectName: string) {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/pullrequest`);
    return response.data;
}
export async function getCommitsByAccount(projectName: string, username: string) {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/commit/${username}`);
    return response.data;
}
export async function getPullRequestsByAccount(projectName: string, username: string) {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/pullrequest/${username}`);
    return response.data;
}