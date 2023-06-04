import api from "~/api";
import { ActivityHistory } from ".";
import { PromiseServer } from "~/hooks/fetching/response-type";
export async function getHistoryByProject(
  projectName: string,
  username: string | undefined
): PromiseServer<ActivityHistory[]> {
  const urlEncodedProjectName = encodeURIComponent(projectName);
  if (!username) {
    const response = await api.get(
      `/activity/github/${urlEncodedProjectName}/activityHistory`
    );
    return response.data;
  }
  const response = await api.get(
    `/activity/github/${urlEncodedProjectName}/activityHistory`,
    {
      params: {
        username,
      },
    }
  );
  return response.data;
}