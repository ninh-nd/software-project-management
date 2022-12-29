import { Apps, ArrowBack, Info } from "@mui/icons-material";
import { Box, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;
export default function AccountSidebar() {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', } }}>
                <List>
                    <ListItem component={Link}>
                        <ListItemButton onClick={() => navigate(-1)}>
                            <ListItemIcon>
                                <ArrowBack />
                            </ListItemIcon>
                            <ListItemText primary="Back" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem component={Link}>
                        <ListItemButton onClick={() => navigate("")}>
                            <ListItemIcon>
                                <Info />
                            </ListItemIcon>
                            <ListItemText primary="Info" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem component={Link}>
                        <ListItemButton onClick={() => navigate("thirdParty")}>
                            <ListItemIcon>
                                <Apps />
                            </ListItemIcon>
                            <ListItemText primary="Linked third parties" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    )
}