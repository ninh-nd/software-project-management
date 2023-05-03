import api from "~/api";
import { IVulnerability } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function getCVEs(cpe: string): PromiseServer<IVulnerability[]> {
  const response = await api.get("/vuln/search", { params: { cpe } });
  return response.data;
}
