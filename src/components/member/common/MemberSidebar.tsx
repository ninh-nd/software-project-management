import { HomeOutlined, SecurityOutlined, Task } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectInQuery } from "~/hooks/query";
import { useIsDrawerOpen, useThemeActions } from "~/hooks/theme";
import SelectProject from "../../common/sidebar/SelectProject";
const drawerWidth = 240;
interface ItemProps {
  text: string;
  icon: JSX.Element;
  path: string;
}
function Item({ text, icon, path }: ItemProps) {
  const navigate = useNavigate();
  const { setIsDrawerOpen } = useThemeActions();
  return (
    <ListItem component={Link}>
      <ListItemButton
        onClick={() => {
          setIsDrawerOpen(false);
          navigate(path);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
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
    <Box>
      <List>
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
        <ListItem>
          <SelectProject />
        </ListItem>
        <Divider />
        <Item
          text="Vulnerabilities dashboard"
          icon={<SecurityOutlined />}
          path={`/${currentProject}/vulnerabilities`}
        />
      </List>
    </Box>
  );
}
export default function MemberSidebar() {
  const isDrawerOpen = useIsDrawerOpen();
  const { setIsDrawerOpen } = useThemeActions();
  function handleDrawerToggle() {
    setIsDrawerOpen(!isDrawerOpen);
  }
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="temporary"
        sx={{ display: { xs: "block", md: "none" } }}
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        anchor="top"
        disableScrollLock={true}
      >
        <Toolbar />
        <DrawerContent />
      </Drawer>
    </>
  );
}
