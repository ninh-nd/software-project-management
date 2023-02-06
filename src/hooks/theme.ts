import { createTheme, Theme } from "@mui/material";
import { create } from "zustand";
interface ThemeStore {
  theme: Theme;
  actions: {
    setTheme: (theme: "light" | "dark") => void;
  };
}
const useThemeStore = create<ThemeStore>((set) => {
  const theme =
    localStorage.getItem("theme") === null
      ? "light"
      : (localStorage.getItem("theme") as "light" | "dark");
  return {
    theme: createTheme({ palette: { mode: theme } }),
    actions: {
      setTheme: (theme: "light" | "dark") => {
        localStorage.setItem("theme", theme);
        set({ theme: createTheme({ palette: { mode: theme } }) });
      },
    },
  };
});
export const useThemeHook = () => useThemeStore((state) => state.theme);
export const useThemeActions = () => useThemeStore((state) => state.actions);
