import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "~/components/Topbar";
export default function AdminLayout() {
  const theme = useTheme();
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
