import resourcesAPI from "~/api";
import { IMember } from "~/interfaces/Member";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getMembersOfProject(
  projectName: string
): PromiseServer<IMember[]> {
  const response = await resourcesAPI.get(`/project/${projectName}/member`);
  return response.data;
}
export async function markTask(taskIdArray: string[], status: string) {
  taskIdArray.forEach(async (taskId) => {
    await resourcesAPI.put(`/task/${taskId}`, { status });
  });
}
export async function assignTask(
  taskId: string,
  memberId: string
): PromiseServer<IMember> {
  const response = await resourcesAPI.patch(`/member/${memberId}/assignTask`, {
    taskId,
  });
  return response.data;
}
