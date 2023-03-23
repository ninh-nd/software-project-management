import {
  Logout,
  Brightness4,
  Brightness7,
  AccountCircle,
} from "@mui/icons-material";
import { IconButton, Tooltip, Box, AppBar, SxProps } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountInfo, logout } from "~/actions/accountAction";
import { useProjectActions } from "~/hooks/project";
import { useThemeActions, useThemeHook } from "~/hooks/theme";
const topBarStyle: SxProps = {
  width: "100%",
  height: "50px",
  position: "sticky",
  top: "0",
};
const topbarWrapperStyle: SxProps = {
  display: "flex",
  height: "100%",
  p: "0px 20px",
  alignItems: "center",
  flexDirection: "row-reverse",
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
    if (data === null) return;
    const { username } = data;
    if (currentProject !== undefined) setCurrentProject(currentProject);
    navigate(`/user/${username}`);
  }
  return (
    <AppBar sx={topBarStyle}>
      <Box sx={topbarWrapperStyle}>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogOut}>
            <Logout />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={theme.palette.mode === "light" ? "Dark Mode" : "Light Mode"}
        >
          <IconButton onClick={changeTheme}>
            {theme.palette.mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Account">
          <IconButton onClick={redirectToAccountPage}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </Box>
    </AppBar>
  );
}
