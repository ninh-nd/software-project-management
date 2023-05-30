import api from "~/api";
import { Workflow } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function getWorkflows(url: string): PromiseServer<Workflow[]> {
  const response = await api.get("/workflow", {
    params: { url },
  });
  return response.data;
}
export async function pushNewWorkflow(
  url: string,
  branch: string | undefined,
  data: Workflow,
  message: string
): PromiseServer<Workflow> {
  const response = await api.post("/workflow", {
    url,
    branch,
    data,
    message,
  });
  return response.data;
}
