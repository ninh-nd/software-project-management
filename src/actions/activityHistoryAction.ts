import api from "~/api";
import { ActivityHistory } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getAcivityHistoryByProject(
  projectName: string
): PromiseServer<ActivityHistory[]> {
  const response = await api.get(
    `/activity/github/${projectName}/activityHistory`
  );
  return response.data;
}
