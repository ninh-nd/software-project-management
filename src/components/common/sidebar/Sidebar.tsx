import { useNavigate } from "react-router-dom"
import SelectProject from './SelectProject'
import { Box, Divider } from '@mui/material'
import { Drawer } from '@mui/material'
import { List } from '@mui/material'
import { ListItem, ListItemIcon, ListItemText, ListItemButton, Link } from '@mui/material'
import { HomeOutlined, InfoOutlined, AssessmentOutlined, TaskOutlined } from '@mui/icons-material'
import { useProjectHook } from "~/hooks/project"
const drawerWidth = 240
const Sidebar = (): JSX.Element => {
  const currentProject = useProjectHook()
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', } }}>
        <List>
          <ListItem component={Link}>
            <ListItemButton onClick={() => navigate(`/${currentProject}/`)}>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link}>
            <ListItemButton onClick={() => navigate(`/${currentProject}/phases`)}>
              <ListItemIcon>
                <AssessmentOutlined />
              </ListItemIcon>
              <ListItemText primary="Phase" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link}>
            <ListItemButton onClick={() => navigate(`/${currentProject}/tasks`)}>
              <ListItemIcon>
                <TaskOutlined />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link}>
            <ListItemButton onClick={() => navigate(`/${currentProject}/memberInfo`)}>
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
  )
}
export default Sidebar