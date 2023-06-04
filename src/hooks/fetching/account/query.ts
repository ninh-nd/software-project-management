import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAccount,
  getAccountById,
  getAllAccounts,
  getPermissions,
  updateAccessToken,
  updateAccount,
  updatePermission,
} from "./axios";
import { AccountUpdate } from ".";
import { useSnackbar } from "notistack";
import { toast } from "~/utils/toast";

export function useAccountsQuery() {
  return useQuery(["accounts"], getAllAccounts);
}
export function useAccountByIdQuery(id: string) {
  return useQuery(["account", id], () => getAccountById(id));
}
export function useAccountUpdateMutation() {
  interface AccountUpdateParams {
    id: string;
    updateData: AccountUpdate;
  }
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ id, updateData }: AccountUpdateParams) =>
      updateAccount(id, updateData),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["accounts"]);
      });
    },
  });
}
export function usePermissionListQuery() {
  return useQuery(["permissions"], getPermissions);
}
export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["accounts"]);
      });
    },
  });
}
export function useUpdatePermissionMutation() {
  interface UpdatePermissionParams {
    id: string;
    permission: string[];
  }
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ id, permission }: UpdatePermissionParams) =>
      updatePermission(id, permission),
    onSuccess: (response, { id }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["permissions"]);
        queryClient.invalidateQueries(["account", id]);
      });
    },
  });
}
export function useUpdateAccessTokenMutation() {
  interface UpdateAccessTokenParams {
    id: string;
    accessToken: string;
  }
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ id, accessToken }: UpdateAccessTokenParams) =>
      updateAccessToken(id, accessToken),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["accountInfo"]);
      });
    },
  });
}
