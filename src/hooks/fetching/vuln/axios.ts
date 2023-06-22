import api from "~/api";
import { Progress } from ".";
import { PromiseServer } from "../response-type";

export async function getVulnProgress(
  projectName: string
): PromiseServer<Progress> {
  const response = await api.get("/vuln/progress", {
    params: { projectName },
  });
  return response.data;
}
