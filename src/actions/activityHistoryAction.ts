import resourcesAPI from "~/api";
import { Commits, PullRequests } from "~/interfaces/GithubData";
import ServerResponse from "~/interfaces/ServerResponse";
export async function getCommits(projectName: string): Promise<ServerResponse<Commits>> {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/commit`);
    return response.data;
}
export async function getPullRequests(projectName: string): Promise<ServerResponse<PullRequests>> {
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