import api from "~/api";
import { IPhaseCreate, IProject } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getProjectInfo(
  projectName: string
): PromiseServer<IProject> {
  const response = await api.get(`/project/${projectName}`);
  return response.data;
}
export async function createPhaseModel(
  projectName: string,
  model: IPhaseCreate[]
) {
  const response = await api.post(`/project/${projectName}`, {
    data: model,
  });
  return response.data;
}
