import {
  AccountCircleOutlined,
  Add,
  Book,
  ExpandMore,
  LogoutOutlined,
  Menu,
} from "@mui/icons-material";
import {
  AppBarProps,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  AppBar as MuiAppBar,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountInfo } from "~/hooks/fetching/account/axios";
import { logout } from "~/hooks/fetching/auth/axios";
import { drawerWidth, useDrawerState } from "~/hooks/drawer";
import { useProjectInQuery } from "~/hooks/fetching/user/query";
import ImportProject from "~/components/dialogs/ImportProjectDialog";
import { useUserRole } from "~/hooks/general";
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
  const navigate = useNavigate();
  const role = useUserRole();
  const { currentProject } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { open, setOpen } = useDrawerState();
  const projectInQuery = useProjectInQuery();
  const projects = projectInQuery.data?.data;
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
  function switchProject(event: SelectChangeEvent<string>, child: ReactNode) {
    const selection = event.target.value;
    const encoded = encodeURIComponent(selection);
    if (selection === "add-new-project") {
      setOpenDialog(true);
      return;
    }
    navigate(`/${encoded}/`);
  }
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        {role === "admin" ? (
          <></>
        ) : (
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
        )}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        {role === "manager" && (
          <FormControl sx={{ px: 1 }}>
            <InputLabel sx={{ color: "white" }}>Project</InputLabel>
            <Select
              label="Project"
              IconComponent={() => <ExpandMore color="inherit" />}
              sx={{ minWidth: 200, color: "info" }}
              onChange={switchProject}
              value={currentProject}
            >
              {projects?.map((project) => (
                <MenuItem key={project._id} value={project.name}>
                  <Stack direction="row" alignItems="center">
                    <Book fontSize="small" />
                    <Typography>{project.name}</Typography>
                  </Stack>
                </MenuItem>
              ))}
              <MenuItem key="add-project" value="add-new-project">
                <Stack direction="row" alignItems="center">
                  <Add fontSize="small" />
                  <Typography>Add new project</Typography>
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>
        )}
        <Tooltip
          title="Account"
          sx={{ display: role === "admin" ? "none" : "inline-flex" }}
        >
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
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <ImportProject setClose={() => setOpenDialog(false)} />
      </Dialog>
    </AppBar>
  );
}
