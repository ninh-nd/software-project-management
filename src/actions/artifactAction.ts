import api from "~/api";
import { Artifact } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getArtifact(artifactId: string): PromiseServer<Artifact> {
  const response = await api.get(`/artifact/${artifactId}`);
  return response.data;
}
export async function getAllArtifacts(
  projectName: string
): PromiseServer<Artifact[]> {
  const response = await api.get("/artifact", { params: { projectName } });
  return response.data;
}
