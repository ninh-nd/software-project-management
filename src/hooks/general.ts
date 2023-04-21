import { create } from "zustand";
import { getProjectIn } from "~/actions/userAction";
import { useAccountInfoQuery } from "./query";

interface ProjectStore {
  currentProject: string;
  actions: {
    setCurrentProject: (project: string) => void;
  };
}
const useProjectStore = create<ProjectStore>((set) => {
  getProjectIn().then((data) =>
    set({ currentProject: data.data ? data.data[0].name : undefined })
  );
  return {
    currentProject: "",
    actions: {
      setCurrentProject: (project: string) => {
        set({ currentProject: project });
      },
    },
  };
});
export const useProjectHook = () =>
  useProjectStore((state) => state.currentProject);
export const useProjectActions = () =>
  useProjectStore((state) => state.actions);
export const usePermissionHook = () => {
  const accountInfoQuery = useAccountInfoQuery();
  const accountInfo = accountInfoQuery.data?.data;
  if (!accountInfo) return [];
  return accountInfo.permission;
};
