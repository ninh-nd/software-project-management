import api from "~/api";
import { GithubRepoImport } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getGithubRepos(): PromiseServer<GithubRepoImport[]> {
  const response = await api.get("/thirdParty/github/repo");
  return response.data;
}
