import {
  Logout,
  Brightness4,
  Brightness7,
  AccountCircle,
} from "@mui/icons-material";
import { IconButton, Tooltip, Box, AppBar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountInfo, logout } from "~/actions/accountAction";
import { useProjectActions } from "~/hooks/project";
import { useThemeActions, useThemeHook } from "~/hooks/theme";
import "~/styles/style.scss";
const Topbar = (): JSX.Element => {
  const theme = useThemeHook();
  const { setTheme } = useThemeActions();
  const navigate = useNavigate();
  const { currentProject } = useParams();
  const { setCurrentProject } = useProjectActions();
  const handleLogOut = async () => {
    logout();
    navigate("/login", { replace: true });
  };
  const changeTheme = () => {
    if (theme.palette.mode === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const redirectToAccountPage = async () => {
    const account = await getAccountInfo();
    const {
      data: { username },
    } = account;
    if (currentProject !== undefined) setCurrentProject(currentProject);
    navigate(`/user/${username}`);
  };
  return (
    <AppBar className="topbar">
      <Box className="topbarWrapper">
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
};
export default Topbar;
