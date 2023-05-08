import { createTheme, Theme } from "@mui/material";
import { create } from "zustand";
interface ThemeStore {
  theme: Theme;
  isDrawerOpen: boolean;
  actions: {
    setTheme: (theme: "light" | "dark") => void;
    setIsDrawerOpen: (isOpen: boolean) => void;
  };
}
const useThemeStore = create<ThemeStore>((set) => {
  const theme = !localStorage.getItem("theme")
    ? "light"
    : (localStorage.getItem("theme") as "light" | "dark");
  return {
    theme: createTheme({ palette: { mode: theme } }),
    isDrawerOpen: false,
    actions: {
      setTheme: (theme: "light" | "dark") => {
        localStorage.setItem("theme", theme);
        set({ theme: createTheme({ palette: { mode: theme } }) });
      },
      setIsDrawerOpen: (isOpen: boolean) => {
        set({ isDrawerOpen: isOpen });
      },
    },
  };
});
export const useCustomTheme = () => useThemeStore((state) => state.theme);
export const useThemeActions = () => useThemeStore((state) => state.actions);
export const useIsDrawerOpen = () =>
  useThemeStore((state) => state.isDrawerOpen);
