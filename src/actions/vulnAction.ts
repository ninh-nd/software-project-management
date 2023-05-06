import api from "~/api";
import { Vulnerability } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function getCVEs(cpe: string): PromiseServer<Vulnerability[]> {
  const response = await api.get("/vuln/search", { params: { cpe } });
  return response.data;
}
