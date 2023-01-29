import api from "~/api";
import { IArtifact } from "~/interfaces/Artifact";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getArtifact(
  artifactId: string
): PromiseServer<IArtifact> {
  const response = await api.get(`/artifact/${artifactId}`);
  return response.data;
}
