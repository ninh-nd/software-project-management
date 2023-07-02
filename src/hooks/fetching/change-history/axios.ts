import api from "~/api";
import { ChangeHistory } from ".";
import { PromiseServer } from "../response-type";

export async function getChangeHistory(
  objectId: string
): PromiseServer<ChangeHistory[]> {
  const response = await api.get("/history", {
    params: {
      objectId,
    },
  });
  return response.data;
}
