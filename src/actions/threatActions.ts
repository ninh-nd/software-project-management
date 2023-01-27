import { PromiseServer } from "~/interfaces/ServerResponse";
import resourcesAPI from "~/api";
import { IThreat } from "~/interfaces/Threat";

export async function getThreats(): PromiseServer<IThreat[]> {
  const response = await resourcesAPI.get("/threat");
  return response.data;
}
