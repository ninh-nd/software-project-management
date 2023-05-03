import api from "~/api";
import { IArtifact } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getArtifact(
  artifactId: string
): PromiseServer<IArtifact> {
  const response = await api.get(`/artifact/${artifactId}`);
  return response.data;
}
export async function getAllArtifacts(
  projectName: string
): PromiseServer<IArtifact[]> {
  const response = await api.get("/artifact", { params: { projectName } });
  return response.data;
}
