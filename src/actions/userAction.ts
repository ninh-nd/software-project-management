import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import { Project, User } from "~/interfaces/Entity";
export async function getMembersOfProject(
  projectName: string
): PromiseServer<User[]> {
  const urlEncodedProjectName = encodeURIComponent(projectName);
  const response = await api.get(`/project/${urlEncodedProjectName}/member`);
  return response.data;
}
export async function getMemberById(memberId: string): PromiseServer<User> {
  const response = await api.get(`/user/`, {
    params: {
      memberId,
    },
  });
  return response.data;
}
export async function getMemberByAccountId(
  accountId: string
): PromiseServer<User> {
  const response = await api.get(`/user/`, {
    params: {
      accountId,
    },
  });
  return response.data;
}
export async function assignTask(
  taskId: string,
  memberId: string
): PromiseServer<User> {
  const response = await api.patch(`/user/${memberId}/assignTask/${taskId}`);
  return response.data;
}
export async function getProjectIn(): PromiseServer<Project[]> {
  const response = await api.get(`/user/project`);
  return response.data;
}
