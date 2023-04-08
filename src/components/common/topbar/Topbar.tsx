import Logout from "@mui/icons-material/Logout";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "~/actions/authAction";
import { getAccountInfo } from "~/actions/accountAction";
import { useProjectActions } from "~/hooks/project";
import { useIsDrawerOpen, useThemeActions, useThemeHook } from "~/hooks/theme";
import { Theme } from "@mui/material";
const topBarStyle = {
  height: "50px",
  position: "fixed",
  top: "0",
  zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
};
export default function Topbar() {
  const theme = useThemeHook();
  const { setTheme } = useThemeActions();
  const navigate = useNavigate();
  const { currentProject } = useParams();
  const { setCurrentProject } = useProjectActions();
  async function handleLogOut() {
    logout();
    navigate("/login", { replace: true });
  }
  function changeTheme() {
    if (theme.palette.mode === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  async function redirectToAccountPage() {
    const account = await getAccountInfo();
    const { data } = account;
    if (!data) return;
    const { username } = data;
    if (currentProject !== undefined) setCurrentProject(currentProject);
    navigate(`/user/${username}`);
  }
  const isDrawerOpen = useIsDrawerOpen();
  const { setIsDrawerOpen } = useThemeActions();
  function handleDrawerToggle() {
    setIsDrawerOpen(!isDrawerOpen);
  }
  return (
    <AppBar sx={topBarStyle}>
      <Toolbar sx={{ pb: 1 }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: {
              lg: "none",
            },
          }}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Account">
          <IconButton onClick={redirectToAccountPage}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={theme.palette.mode === "light" ? "Dark Mode" : "Light Mode"}
        >
          <IconButton onClick={changeTheme}>
            {theme.palette.mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogOut}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
