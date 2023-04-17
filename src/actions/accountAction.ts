import api from "~/api";
import { IAccount, IAccountUpdate } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getAccountInfo(): PromiseServer<IAccount> {
  const response = await api.get("/account/");
  return response.data;
}
export async function getAllAccounts(): PromiseServer<IAccount[]> {
  const response = await api.get("/account/list");
  return response.data;
}
export async function getAccountById(id: string): PromiseServer<IAccount> {
  const response = await api.get(`/account/${id}`);
  return response.data;
}
export async function updateAccount(
  id: string,
  updateData: IAccountUpdate
): PromiseServer<IAccount> {
  const response = await api.patch(`/account/${id}`, {
    data: updateData,
  });
  return response.data;
}
export async function deleteAccount(id: string): PromiseServer<IAccount> {
  const response = await api.delete(`/account/${id}`);
  return response.data;
}
