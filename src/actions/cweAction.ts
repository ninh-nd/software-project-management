import api from "~/api";
import { ICWE } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getCWE(id: string): PromiseServer<ICWE> {
  const response = await api.get(`/cwe/${id}`);
  return response.data;
}
