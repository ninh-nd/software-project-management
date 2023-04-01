import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import { IProject, IUser } from "~/interfaces/Entity";
export async function getMembersOfProject(
  projectName: string
): PromiseServer<IUser[]> {
  const response = await api.get(`/project/${projectName}/member`);
  return response.data;
}
export async function getMemberById(memberId: string): PromiseServer<IUser> {
  const response = await api.get(`/user/${memberId}`);
  return response.data;
}
export async function markTask(taskIdArray: string[], status: string) {
  const response = await api.patch("/task", {
    data: taskIdArray,
    status: status,
  });
  return response.data;
}
export async function assignTask(
  taskId: string,
  memberId: string
): PromiseServer<IUser> {
  const response = await api.patch(`/user/${memberId}/assignTask/${taskId}`);
  return response.data;
}
export async function getProjectIn(): PromiseServer<IProject[]> {
  const response = await api.get(`/user/project`);
  return response.data;
}
