import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Account } from "~/interfaces/Entity";
export const usePermissionHook = () => {
  const accountInfo = useAccountContext();
  return accountInfo.permission;
};
export const useUserRole = () => {
  const accountInfo = useAccountContext();
  return accountInfo.role;
};
interface LoginStore {
  account: Account;
  actions: {
    setAccount: (account: Account) => void;
  };
}
const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      account: {} as Account,
      actions: {
        setAccount: (account) => set({ account }),
      },
    }),
    {
      name: "login-store",
    }
  )
);
export const useAccountContext = () => useLoginStore((state) => state.account);
export const useAccountContextAction = () =>
  useLoginStore((state) => state.actions);
