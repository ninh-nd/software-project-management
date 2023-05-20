import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "~/components/common/topbar/Topbar";
import { useCustomTheme } from "~/hooks/theme";
export default function AdminLayout() {
  const theme = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar />
      <Box sx={{ display: "flex", mt: "100px" }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
