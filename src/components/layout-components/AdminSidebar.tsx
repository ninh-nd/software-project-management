import {
  AccountCircleOutlined,
  BuildOutlined,
  ChevronLeft,
  HomeOutlined,
  PatternOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, List, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDrawerState } from "~/hooks/drawer";
import { Item } from "./SidebarItem";
import { Drawer } from "./StyledDrawer";
function DrawerContent() {
  const { open: isDrawerOpen } = useDrawerState();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <List component="nav">
      <Item text="Overview" icon={<HomeOutlined />} path={`/admin/home`} />
      <Item
        text="Account"
        icon={<AccountCircleOutlined />}
        path={`/admin/accounts`}
      />
      <Item
        text="Template"
        icon={<PatternOutlined />}
        path={`/admin/templates`}
      />
      <Item
        text="Scanning tool"
        icon={<BuildOutlined />}
        path={`/admin/tools`}
      />
    </List>
  );
}
export default function AdminSidebar() {
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
