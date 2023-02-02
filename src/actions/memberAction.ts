import api from "~/api";
import { IMember } from "~/interfaces/Member";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getMembersOfProject(
  projectName: string
): PromiseServer<IMember[]> {
  const response = await api.get(`/project/${projectName}/member`);
  return response.data;
}
/* Need to be rewrite someday */
export async function markTask(taskIdArray: string[], status: string) {
  taskIdArray.forEach(async (taskId) => {
    await api.put(`/task`, { status });
  });
}
export async function assignTask(
  taskId: string,
  memberId: string
): PromiseServer<IMember> {
  const response = await api.patch(`/member/${memberId}/assignTask/${taskId}`);
  return response.data;
}
