import { PromiseServer } from "~/interfaces/ServerResponse";
import api from "~/api";
import { IThreat, IThreatCreate } from "~/interfaces/Threat";

export async function getThreats(): PromiseServer<IThreat[]> {
  const response = await api.get("/threat");
  return response.data;
}
export async function createThreat(threat: IThreatCreate) {
  const response = await api.post("/threat", {
    data: threat,
  });
  return response.data;
}
