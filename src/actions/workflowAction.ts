import api from "~/api";
import { Workflow } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function getWorkflows(url: string): PromiseServer<Workflow[]> {
  const response = await api.get("/workflow", {
    params: { url },
  });
  return response.data;
}
