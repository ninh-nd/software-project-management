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
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectInQuery } from "~/hooks/query";
import ProjectMenuItem from "../../manager/sidebar/ProjectMenuItem";
import { useState } from "react";
import { useDrawerState } from "~/hooks/drawer";
const drawerWidth = 240;
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
  if (!projects) return <></>;
  const firstProject = projects[0].name;
  let { currentProject } = useParams();
  if (!currentProject) {
    currentProject = firstProject;
  }
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
      <ProjectMenuItem />
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
