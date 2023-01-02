import resourcesAPI from "~/api"
import { ICommits, IPullRequests } from "~/interfaces/GithubData"
import { IResponse } from "~/interfaces/ServerResponse"
export async function getCommits(projectName: string): Promise<IResponse<ICommits>> {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/commit`)
    return response.data
}
export async function getPullRequests(projectName: string): Promise<IResponse<IPullRequests>> {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/pullrequest`)
    return response.data
}
export async function getCommitsByAccount(projectName: string, username: string) {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/commit/${username}`)
    return response.data
}
export async function getPullRequestsByAccount(projectName: string, username: string) {
    const response = await resourcesAPI.get(`/activity/github/${projectName}/pullrequest/${username}`)
    return response.data
}