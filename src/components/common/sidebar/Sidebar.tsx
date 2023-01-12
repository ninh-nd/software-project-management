import { useNavigate } from "react-router-dom";
import SelectProject from "./SelectProject";
import { Box, Divider, Typography } from "@mui/material";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Link,
} from "@mui/material";
import {
  HomeOutlined,
  InfoOutlined,
  AssessmentOutlined,
  TaskOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { useProjectHook } from "~/hooks/project";
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
    <Box sx={{ display: "flex" }}>
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
            text="Tasks"
            icon={<TaskOutlined />}
            path={`/${currentProject}/tasks`}
          />
          <Item
            text="Members"
            icon={<InfoOutlined />}
            path={`/${currentProject}/memberInfo`}
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
