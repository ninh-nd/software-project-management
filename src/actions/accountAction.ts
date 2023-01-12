import api from "~/api";
import { IAccount } from "~/interfaces/Account";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function login(username: string, password: string) {
  const response = await api.post("/account/login", { username, password });
  return response;
}
export async function logout() {
  const response = await api.get("/account/logout");
  return response;
}
export async function getAccountInfo(): PromiseServer<IAccount> {
  const response = await api.get("/account/");
  return response.data;
}
