import api from "~/api";
import { IPhaseTemplateCreate, IProject } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getProjectInfo(
  projectName: string
): PromiseServer<IProject> {
  const response = await api.get(`/project/${projectName}`);
  return response.data;
}
export async function createPhaseTemplate(
  projectName: string,
  template: IPhaseTemplateCreate
) {
  const response = await api.post(`/project/${projectName}`, {
    data: template,
  });
  return response.data;
}
