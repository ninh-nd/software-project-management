import api from "~/api";
import {
  GithubRepoImport,
  PhaseTemplateCreate,
  Project,
} from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getProjectInfo(
  projectName: string
): PromiseServer<Project> {
  const response = await api.get(`/project/${projectName}`);
  return response.data;
}
export async function createPhaseTemplate(
  projectName: string,
  template: PhaseTemplateCreate
) {
  const response = await api.post(`/project/${projectName}`, {
    data: template,
  });
  return response.data;
}
export async function importProject(
  data: GithubRepoImport
): PromiseServer<Project> {
  const response = await api.post("project", {
    data: {
      type: "import",
      data,
    },
  });
  return response.data;
}
