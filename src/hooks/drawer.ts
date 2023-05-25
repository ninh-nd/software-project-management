import { create } from "zustand";
interface DrawerState {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const useDrawerState = create<DrawerState>((set) => {
  return {
    open: false,
    setOpen: (open: boolean) => set({ open }),
  };
});
