import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import { IVulnerability, IVulnerabilityCreate } from "~/interfaces/Entity";

export async function getCVEs(cpe: string): PromiseServer<IVulnerability[]> {
  const response = await api.get("/vuln/search", { params: { cpe } });
  return response.data;
}

export async function getVulnerabilities(): PromiseServer<IVulnerability[]> {
  const response = await api.get(`/vuln`);
  return response.data;
}
