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
import { AccountCircle, GridView } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useIsDrawerOpen, useThemeActions } from "~/hooks/theme";
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
  return (
    <Box>
      <List>
        <Item
          text="Accounts"
          icon={<AccountCircle />}
          path={"/admin/accounts"}
        />
        <Item
          text="Third-party integration"
          icon={<GridView />}
          path={"/admin/third-parties"}
        />
        <Divider />
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
