import {
  AccountCircleOutlined,
  LogoutOutlined,
  Menu,
} from "@mui/icons-material";
import {
  AppBarProps,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAccountInfo } from "~/actions/accountAction";
import { logout } from "~/actions/authAction";
import { useDrawerState } from "~/hooks/drawer";
const drawerWidth: number = 240;
interface Props extends AppBarProps {
  open: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default function Topbar() {
  const { open, setOpen } = useDrawerState();
  const navigate = useNavigate();
  async function handleLogOut() {
    logout();
    navigate("/login", { replace: true });
  }
  async function redirectToAccountPage() {
    const account = await getAccountInfo();
    const { data } = account;
    if (!data) return;
    const { username } = data;
    navigate(`/user/${username}`);
  }
  function handleDrawerToggle() {
    setOpen(!open);
  }
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <Tooltip title="Account">
          <IconButton onClick={redirectToAccountPage}>
            <AccountCircleOutlined color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogOut}>
            <LogoutOutlined color="secondary" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
