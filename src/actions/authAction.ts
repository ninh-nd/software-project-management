import api from "~/api";

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
