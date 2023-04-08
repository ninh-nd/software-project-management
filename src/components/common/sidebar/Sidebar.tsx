import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useProjectHook } from "~/hooks/project";
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
          icon={<HomeOutlinedIcon />}
          path={`/${currentProject}/`}
        />
        <Item
          text="Phase"
          icon={<AssessmentOutlinedIcon />}
          path={`/${currentProject}/phases`}
        />
        <Item
          text="Tickets"
          icon={<InfoOutlinedIcon />}
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
        <Typography variant="body2" sx={{ m: "5px" }}>
          General
        </Typography>
        <Item
          text="Vulnerabilities database"
          icon={<SecurityOutlinedIcon />}
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
