import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectInfo, importProject } from "./axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { toast } from "~/utils/toast";
import { RepoImport } from "../git";

export function useProjectInfoQuery(projectName: string) {
  return useQuery(["projectInfo", projectName], () =>
    getProjectInfo(projectName)
  );
}
export function useImportProjectMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RepoImport) => importProject(data),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["projectIn"]);
        const { data } = response;
        if (data) {
          const encodedName = encodeURIComponent(data.name);
          navigate(`/${encodedName}/`);
        }
      });
    },
  });
}
