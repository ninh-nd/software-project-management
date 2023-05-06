import api from "~/api";
import { CWE } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getCWE(id: string): PromiseServer<CWE> {
  const response = await api.get(`/cwe/${id}`);
  return response.data;
}
