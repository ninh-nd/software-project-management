import api from "~/api";
import { IAccount } from "~/interfaces/Account";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getAccountInfo(): PromiseServer<IAccount> {
  const response = await api.get("/account/");
  return response.data;
}
