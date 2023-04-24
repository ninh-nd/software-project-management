import {
  AssessmentOutlined,
  HomeOutlined,
  InfoOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProjectHook } from "~/hooks/general";
import { useIsDrawerOpen, useThemeActions } from "~/hooks/theme";
import ImportProject from "./ImportProject";
import SelectProject from "./SelectProject";
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
  const currentProject = useProjectHook();
  return (
    <Box>
      <List>
        <Item
          text="Home"
          icon={<HomeOutlined />}
          path={`/${currentProject}/`}
        />
        <Item
          text="Phase"
          icon={<AssessmentOutlined />}
          path={`/${currentProject}/phases`}
        />
        <Item
          text="Tickets"
          icon={<InfoOutlined />}
          path={`/${currentProject}/tickets`}
        />
        <Divider />
        <ListItem>
          <SelectProject />
        </ListItem>
        <ListItem>
          <ImportProject />
        </ListItem>
        <Divider />
        <Item
          text="Vulnerabilities database"
          icon={<SecurityOutlined />}
          path={"/vulnerabilities"}
        />
      </List>
    </Box>
  );
}
export default function Sidebar() {
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
