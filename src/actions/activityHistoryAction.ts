import api from "~/api";
import { ActivityHistory } from "~/interfaces/Entity";
import { PromiseServer } from "~/interfaces/ServerResponse";
export async function getHistoryByProject(
  projectName: string,
  username: string | undefined
): PromiseServer<ActivityHistory[]> {
  if (!username) {
    const response = await api.get(
      `/activity/github/${projectName}/activityHistory`
    );
    return response.data;
  }
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
