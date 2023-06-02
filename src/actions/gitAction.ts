import api from "~/api";
import { RepoImport } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getGithubRepos(): PromiseServer<RepoImport[]> {
  const response = await api.get("/thirdParty/github/repo");
  return response.data;
}
export async function getGitlabRepos(): PromiseServer<RepoImport[]> {
  const response = await api.get("/thirdParty/gitlab/repo");
  return response.data;
}
