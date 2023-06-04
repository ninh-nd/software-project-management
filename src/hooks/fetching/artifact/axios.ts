import api from "~/api";
import { Artifact, ArtifactUpdate } from ".";
import { PromiseServer } from "~/hooks/fetching/response-type";
export async function getArtifact(artifactId: string): PromiseServer<Artifact> {
  const response = await api.get(`/artifact/${artifactId}`);
  return response.data;
}
export async function getAllArtifacts(
  projectName: string
): PromiseServer<Artifact[]> {
  const urlEncodedProjectName = encodeURIComponent(projectName);
  const response = await api.get("/artifact", {
    params: { projectName: urlEncodedProjectName },
  });
  return response.data;
}
export async function updateArtifact(
  artifactId: string,
  artifact: ArtifactUpdate
): PromiseServer<Artifact> {
  const response = await api.patch(`/artifact/${artifactId}`, {
    data: artifact,
  });
  return response.data;
}
