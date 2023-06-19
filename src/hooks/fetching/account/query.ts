import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAccount,
  disconnectFromGithub,
  disconnectFromGitlab,
  getAccountById,
  getAccountInfo,
  getAllAccounts,
  getPermissions,
  updateAccessToken,
  updateAccount,
  updatePermission,
  updateScannerPreference,
} from "./axios";
import { AccountUpdate } from ".";
import { useSnackbar } from "notistack";
import { toast } from "~/utils/toast";
import { useSetAccountContext } from "~/hooks/general";

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
  const setAccountContext = useSetAccountContext();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (accessToken: string) => updateAccessToken(accessToken),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, async () => {
        const { data } = await getAccountInfo();
        if (data) setAccountContext(data);
      });
    },
  });
}
export function useDisconnectFromGithubMutation() {
  const setAccountContext = useSetAccountContext();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: disconnectFromGithub,
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, async () => {
        const { data } = await getAccountInfo();
        if (data) setAccountContext(data);
      });
    },
  });
}
export function useDisconnectFromGitlabMutation() {
  const setAccountContext = useSetAccountContext();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: disconnectFromGitlab,
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, async () => {
        const { data } = await getAccountInfo();
        if (data) setAccountContext(data);
      });
    },
  });
}
export function useUpdateScannerPreferenceMutation() {
  interface Params {
    scanner: string;
    endpoint: string | undefined;
  }
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ scanner, endpoint }: Params) =>
      updateScannerPreference(scanner, endpoint),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {});
    },
  });
}
