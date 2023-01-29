import resourcesAPI from "~/api";
import { IArtifactCreate } from "~/interfaces/Artifact";
import { IPhase } from "~/interfaces/Phase";
import { IPhasePreset } from "~/interfaces/PhasePreset";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function addTaskToPhase(
  phaseId: string,
  taskId: string
): PromiseServer<IPhase> {
  const response = await resourcesAPI.patch(`/phase/${phaseId}/task/add`, {
    taskId,
  });
  return response.data;
}
export async function removeTaskFromPhase(
  phaseId: string,
  taskId: string
): PromiseServer<IPhase> {
  const response = await resourcesAPI.patch(`/phase/${phaseId}/task/delete`, {
    taskId,
  });
  return response.data;
}
export async function getPhasePresets(): PromiseServer<IPhasePreset[]> {
  const response = await resourcesAPI.get(`/phase/presets`);
  return response.data;
}
export async function addArtifactToPhase(
  phaseId: string,
  artifact: IArtifactCreate
): PromiseServer<IPhase> {
  const response = await resourcesAPI.patch(`/phase/${phaseId}/artifact/add`, {
    artifact: artifact,
  });
  return response.data;
}
export async function removeArtifactFromPhase(
  phaseId: string,
  artifactId: string
): PromiseServer<IPhase> {
  const response = await resourcesAPI.patch(
    `/phase/${phaseId}/artifact/delete/${artifactId}`
  );
  return response.data;
}
export async function updateArtifact(
  phaseId: string,
  artifactId: string,
  artifact: IArtifactCreate
): PromiseServer<IPhase> {
  const response = await resourcesAPI.patch(
    `/phase/${phaseId}/artifact/update/${artifactId}`,
    {
      artifact: artifact,
    }
  );
  return response.data;
}
