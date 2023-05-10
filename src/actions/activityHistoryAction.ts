import api from "~/api";
import { ActivityHistory } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getHistoryByProject(
  projectName: string,
  username: string = ""
): PromiseServer<ActivityHistory[]> {
  const response = await api.get(
    `/activity/github/${projectName}/activityHistory`,
    {
      params: {
        username,
      },
    }
  );
  return response.data;
}
