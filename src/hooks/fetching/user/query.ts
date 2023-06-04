import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccountContext } from "~/hooks/general";
import {
  assignTask,
  getUserByAccountId,
  getUserById,
  getMembersOfProject,
  getProjectIn,
} from "./axios";
import { useSnackbar } from "notistack";
import { toast } from "~/utils/toast";

export function useUserByAccountIdQuery() {
  const account = useAccountContext();
  return useQuery(
    ["userInfo", account._id],
    () => getUserByAccountId(account._id),
    {
      enabled: !!account,
    }
  );
}

export function useMembersQuery(project: string) {
  return useQuery(["members", project], () => getMembersOfProject(project));
}

export function useUserQuery(memberId: string) {
  return useQuery(["member", memberId], () => getUserById(memberId));
}

export function useAssignTaskMutation() {
  interface AssignTaskParams {
    taskId: string;
    memberId: string;
  }
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ taskId, memberId }: AssignTaskParams) =>
      assignTask(taskId, memberId),
    onSuccess: (response, { memberId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["member", memberId])
      );
    },
  });
}

export function useProjectInQuery() {
  return useQuery(["projectIn"], getProjectIn);
}
