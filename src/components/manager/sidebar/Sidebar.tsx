import {
  AssessmentOutlined,
  ChevronLeft,
  HomeOutlined,
  InfoOutlined,
  SecurityOutlined,
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
import ProjectMenuItem from "./ProjectMenuItem";
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
      <ListSubheader component="div" inset>
        Project navigation
      </ListSubheader>
      <Item text="Home" icon={<HomeOutlined />} path={`/${currentProject}/`} />
      <Item
        text="Phase"
        icon={<AssessmentOutlined />}
        path={`/${currentProject}/phases`}
      />
      <Item
        text="Ticket"
        icon={<InfoOutlined />}
        path={`/${currentProject}/tickets`}
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
export default function Sidebar() {
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
