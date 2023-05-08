import Sidebar from "~/components/common/sidebar/Sidebar";
import Topbar from "~/components/common/topbar/Topbar";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useCustomTheme } from "~/hooks/theme";
export default function DashboardLayout() {
  const theme = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar />
      <Box sx={{ display: "flex", mt: "100px" }}>
        <Sidebar />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
