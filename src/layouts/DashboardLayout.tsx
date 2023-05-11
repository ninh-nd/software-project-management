import Sidebar from "~/components/manager/sidebar/Sidebar";
import Topbar from "~/components/common/topbar/Topbar";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useCustomTheme } from "~/hooks/theme";
import { useUserRole } from "~/hooks/general";
import MemberSidebar from "~/components/member/common/MemberSidebar";
function SidebarWithRole() {
  const role = useUserRole();
  switch (role) {
    case "manager":
      return <Sidebar />;
    case "member":
      return <MemberSidebar />;
    default:
      return <></>;
  }
}
export default function DashboardLayout() {
  const theme = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar />
      <Box sx={{ display: "flex", mt: "100px" }}>
        <SidebarWithRole />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
