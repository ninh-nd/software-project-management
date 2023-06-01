import api from "~/api";
import { Workflow } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function getWorkflows(
  projectName: string
): PromiseServer<Workflow[]> {
  const response = await api.get("/workflow", {
    params: { projectName },
  });
  return response.data;
}
export async function pushNewWorkflow(
  projectName: string,
  branch: string | undefined,
  data: Workflow,
  message: string
): PromiseServer<Workflow> {
  const response = await api.post("/workflow", {
    projectName,
    branch,
    data,
    message,
  });
  return response.data;
}
