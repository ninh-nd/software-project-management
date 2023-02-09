import api from "~/api";
import { IMember } from "~/interfaces/Member";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getMembersOfProject(
  projectName: string
): PromiseServer<IMember[]> {
  const response = await api.get(`/project/${projectName}/member`);
  return response.data;
}
export async function getMemberById(memberId: string): PromiseServer<IMember> {
  const response = await api.get(`/member/${memberId}`);
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
): PromiseServer<IMember> {
  const response = await api.patch(`/member/${memberId}/assignTask/${taskId}`);
  return response.data;
}
