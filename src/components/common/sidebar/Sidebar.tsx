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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProjectHook } from "~/hooks/project";
import SelectProject from "./SelectProject";
const drawerWidth = 240;
interface ItemProps {
  text: string;
  icon: JSX.Element;
  path: string;
}
const Item = ({ text, icon, path }: ItemProps) => {
  const navigate = useNavigate();
  return (
    <ListItem component={Link}>
      <ListItemButton onClick={() => navigate(path)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
const Sidebar = (): JSX.Element => {
  const currentProject = useProjectHook();
  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
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
          <Divider />
          <Typography variant="body2" sx={{ m: "5px" }}>
            General
          </Typography>
          <Item
            text="Vulnerabilities database"
            icon={<SecurityOutlined />}
            path={"/vulnerabilities"}
          />
        </List>
      </Drawer>
    </Box>
  );
};
export default Sidebar;
