import api from "~/api";
import { Account, AccountUpdate } from ".";
import { PromiseServer } from "~/hooks/fetching/response-type";
export async function getAccountInfo(): PromiseServer<Account> {
  const response = await api.get("/account/");
  return response.data;
}
export async function getAllAccounts(): PromiseServer<Account[]> {
  const response = await api.get("/account/list");
  return response.data;
}
export async function getAccountById(id: string): PromiseServer<Account> {
  const response = await api.get(`/account/${id}`);
  return response.data;
}
export async function updateAccount(
  id: string,
  updateData: AccountUpdate
): PromiseServer<Account> {
  const response = await api.patch(`/account/${id}`, {
    data: updateData,
  });
  return response.data;
}
export async function deleteAccount(id: string): PromiseServer<Account> {
  const response = await api.delete(`/account/${id}`);
  return response.data;
}
export async function getPermissions(): PromiseServer<string[]> {
  const response = await api.get("/permission/");
  return response.data;
}
export async function updatePermission(
  id: string,
  updateData: string[]
): PromiseServer<Account> {
  const response = await api.patch(`/account/${id}/permission`, {
    data: updateData,
  });
  return response.data;
}
export async function updateAccessToken(
  id: string,
  accessToken: string
): PromiseServer<Account> {
  const response = await api.patch(`/account/${id}/thirdParty/github`, {
    data: accessToken,
  });
  return response.data;
}
