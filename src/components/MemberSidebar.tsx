import {
  ChevronLeft,
  HomeOutlined,
  SecurityOutlined,
  Task,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Drawer as MuiDrawer,
  Toolbar,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { drawerWidth, useDrawerState } from "~/hooks/drawer";
import { useProjectInQuery } from "~/hooks/query";
interface ItemProps {
  text: string;
  icon: JSX.Element;
  path: string;
}
function Item({ text, icon, path }: ItemProps) {
  const navigate = useNavigate();
  return (
    <ListItemButton
      onClick={() => {
        navigate(path);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
function DrawerContent() {
  const projectInQuery = useProjectInQuery();
  const projects = projectInQuery.data?.data;
  const firstProject = projects ? projects[0].name : "";
  let { currentProject } = useParams();
  if (!currentProject) {
    currentProject = firstProject;
  }
  const { open: isDrawerOpen } = useDrawerState();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <List component="nav">
      <Item
        text="Overview"
        icon={<HomeOutlined />}
        path={`/${currentProject}/`}
      />
      <Item
        text="Tasks and issues"
        icon={<Task />}
        path={`/${currentProject}/tasksAndIssues`}
      />
      <Divider />
      <ListSubheader component="div" inset>
        Vulnerability control
      </ListSubheader>
      <Item
        text="Vulnerabilities"
        icon={<SecurityOutlined />}
        path={`/${currentProject}/vulnerabilities`}
      />
    </List>
  );
}
export default function MemberSidebar() {
  const { open, setOpen } = useDrawerState();
  function handleDrawerToggle() {
    setOpen(!open);
  }
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <DrawerContent />
    </Drawer>
  );
}
