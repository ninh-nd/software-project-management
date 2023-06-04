import api from "~/api";
import { PromiseServer } from "~/hooks/fetching/response-type";
import { PhaseTemplateCreate } from "../phase";
import { RepoImport } from "../git";
import { Project } from ".";
export async function getProjectInfo(
  projectName: string
): PromiseServer<Project> {
  const urlEncodedProjectName = encodeURIComponent(projectName);
  const response = await api.get(`/project/${urlEncodedProjectName}`);
  return response.data;
}
export async function createPhaseTemplate(
  projectName: string,
  template: PhaseTemplateCreate
): PromiseServer<null> {
  const urlEncodedProjectName = encodeURIComponent(projectName);
  const response = await api.post(`/project/${urlEncodedProjectName}`, {
    data: template,
  });
  return response.data;
}
export async function importProject(data: RepoImport): PromiseServer<Project> {
  const response = await api.post("project", {
    data: {
      type: "import",
      data,
    },
  });
  return response.data;
}
