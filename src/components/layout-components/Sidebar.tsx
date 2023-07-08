import {
  AssessmentOutlined,
  ChevronLeft,
  DescriptionOutlined,
  FactCheckOutlined,
  HomeOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDrawerState } from "~/hooks/drawer";
import { useProjectInQuery } from "~/hooks/fetching/user/query";
import { Item } from "./SidebarItem";
import { Drawer } from "./StyledDrawer";
export interface ItemProps {
  text: string;
  icon: JSX.Element;
  path: string;
}
function DrawerContent() {
  const projectInQuery = useProjectInQuery();
  const projects = projectInQuery.data?.data;
  const firstProject = projects ? encodeURIComponent(projects[0]?.name) : "";
  let { currentProject } = useParams();
  if (!currentProject) {
    currentProject = firstProject;
  }
  const encodedUrl = encodeURIComponent(currentProject);
  const { open: isDrawerOpen } = useDrawerState();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <List component="nav">
      <ListSubheader component="div" inset>
        Project navigation
      </ListSubheader>
      <Item text="Home" icon={<HomeOutlined />} path={`/${encodedUrl}/`} />
      <Item
        text="Phase"
        icon={<AssessmentOutlined />}
        path={`/${encodedUrl}/phases`}
      />
      <Item
        text="Script"
        icon={<DescriptionOutlined />}
        path={`/${encodedUrl}/scripts`}
      />
      <Item
        text="Ticket"
        icon={<FactCheckOutlined />}
        path={`/${encodedUrl}/tickets`}
      />
      <Divider />
      <ListSubheader component="div" inset>
        Vulnerability control
      </ListSubheader>
      <Item
        text="Vulnerabilities"
        icon={<SecurityOutlined />}
        path={`/${encodedUrl}/vulnerabilities`}
      />
    </List>
  );
}
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
