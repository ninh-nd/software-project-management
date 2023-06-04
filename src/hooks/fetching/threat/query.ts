import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { createThreat, getThreat, getThreats } from "./axios";
import { ThreatCreate } from ".";
import { toast } from "~/utils/toast";

export function useThreatsQuery() {
  return useQuery(["threats"], getThreats);
}
export function useCreateThreatMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (threat: ThreatCreate) => createThreat(threat),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["artifacts"])
      );
    },
  });
}
export function useThreatQuery(id: string) {
  return useQuery(["threats", id], () => getThreat(id));
}
