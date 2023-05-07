import { useAccountInfoQuery } from "./query";
export const usePermissionHook = () => {
  const accountInfoQuery = useAccountInfoQuery();
  const accountInfo = accountInfoQuery.data?.data;
  if (!accountInfo) return [];
  return accountInfo.permission;
};
