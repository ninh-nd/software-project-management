import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getImportProjects(
  username: string,
  accessToken: string
): PromiseServer<Array<{ name: string; url: string }>> {
  const response = await api.get("/thirdParty/github/projects", {
    params: { username, accessToken },
  });
  return response.data;
}
