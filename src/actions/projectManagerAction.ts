import api from "~/api";
import { IProject } from "~/interfaces/Project";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function getProjectOwn(): PromiseServer<IProject[]> {
  const response = await api.get(`/pm/project`);
  return response.data;
}
