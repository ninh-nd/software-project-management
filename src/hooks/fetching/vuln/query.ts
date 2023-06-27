import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addResolution, getResolution, getVulnProgress } from "./axios";
import { Resolution } from ".";
import { useSnackbar } from "notistack";
import { toast } from "~/utils/toast";

export function useVulnProgress(projectName: string) {
  return useQuery(["progress", projectName], () =>
    getVulnProgress(projectName)
  );
}
export function useAddResolutionMutation() {
  interface Params {
    cveId: string;
    description: string;
  }
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cveId, description }: Params) =>
      addResolution(cveId, description),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["resolution"]);
      });
    },
  });
}
export function useGetResolutionQuery(cveId: string[]) {
  return useQuery(["resolution"], () => getResolution(cveId));
}
