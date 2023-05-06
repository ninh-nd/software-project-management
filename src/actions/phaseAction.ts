import api from "~/api";
import {
  ArtifactCreate,
  Phase,
  PhaseTemplate,
  PhaseTemplateCreate,
} from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getPhase(id: string): PromiseServer<Phase> {
  const response = await api.get(`/phase/${id}`);
  return response.data;
}
export async function addTaskToPhase(
  phaseId: string,
  taskId: string
): PromiseServer<Phase> {
  const response = await api.patch(`/phase/${phaseId}/task/add/${taskId}`);
  return response.data;
}
export async function removeTaskFromPhase(
  phaseId: string,
  taskId: string
): PromiseServer<Phase> {
  const response = await api.patch(`/phase/${phaseId}/task/delete/${taskId}`);
  return response.data;
}
export async function getPhaseTemplates(): PromiseServer<PhaseTemplate[]> {
  const response = await api.get(`/phase/templates`);
  return response.data;
}
export async function createPhasesFromTemplate(
  projectName: string,
  data: PhaseTemplateCreate
): PromiseServer<PhaseTemplate> {
  const response = await api.post(`/phase/templates`, {
    projectName,
    data,
  });
  return response.data;
}
export async function addArtifactToPhase(
  phaseId: string,
  artifact: ArtifactCreate
): PromiseServer<Phase> {
  const response = await api.patch(`/phase/${phaseId}/artifact/add`, {
    data: artifact,
  });
  return response.data;
}
export async function removeArtifactFromPhase(
  phaseId: string,
  artifactId: string
): PromiseServer<Phase> {
  const response = await api.patch(
    `/phase/${phaseId}/artifact/delete/${artifactId}`
  );
  return response.data;
}
export async function updateArtifact(
  phaseId: string,
  artifactId: string,
  artifact: ArtifactCreate
): PromiseServer<Phase> {
  const response = await api.patch(
    `/phase/${phaseId}/artifact/update/${artifactId}`,
    {
      data: artifact,
    }
  );
  return response.data;
}
