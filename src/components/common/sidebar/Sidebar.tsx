import React from 'react';
import { Link } from "react-router-dom";
import SelectProject from './SelectProject';
import { Box, Divider } from '@mui/material';
import { Drawer } from '@mui/material';
import { List } from '@mui/material';
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { HomeOutlined, InfoOutlined, AssessmentOutlined, TaskOutlined } from '@mui/icons-material';
import useProjectStore from '../../../store/useStore';
const drawerWidth = 240;
const Sidebar = (): JSX.Element => {
  const currentProject = useProjectStore(state => state.currentProject);
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', } }}>
        <List>
          <ListItem component={Link} to={`${currentProject}`}>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to={`${currentProject}/projectInfo`}>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to={`${currentProject}/phases`}>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentOutlined />
              </ListItemIcon>
              <ListItemText primary="Phase" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to="tasks">
            <ListItemButton>
              <ListItemIcon>
                <TaskOutlined />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to={`${currentProject}/memberInfo`}>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText primary="Members" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <SelectProject />
          </ListItem>
        </List>
      </Drawer>
    </Box >
  );
}
export default Sidebar;