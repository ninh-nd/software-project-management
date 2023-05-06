import api from "~/api";
import { Account, AccountRegister } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";

export async function login(username: string, password: string) {
  const response = await api.post("/auth/login", { username, password });
  return response;
}
export async function githubLogin() {
  const response = await api.get("/auth/github");
  return response;
}
export async function logout() {
  const response = await api.get("/auth/logout");
  return response;
}
export async function register(data: AccountRegister): PromiseServer<Account> {
  const response = await api.post("/account/reg", data);
  return response.data;
}
