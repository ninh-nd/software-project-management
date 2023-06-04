import { PromiseServer } from "~/hooks/fetching/response-type";
import api from "~/api";
import { Threat, ThreatCreate } from ".";

export async function getThreats(): PromiseServer<Threat[]> {
  const response = await api.get("/threat");
  return response.data;
}
export async function getThreat(id: string): PromiseServer<Threat> {
  const response = await api.get(`/threat/${id}`);
  return response.data;
}
export async function createThreat(
  threat: ThreatCreate
): PromiseServer<Threat> {
  const response = await api.post("/threat", {
    data: threat,
  });
  return response.data;
}
