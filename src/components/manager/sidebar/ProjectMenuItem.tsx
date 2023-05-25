import {
  Add,
  ExpandLess,
  ExpandMore,
  List,
  StarBorder,
} from "@mui/icons-material";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectInQuery } from "~/hooks/query";
export default function ProjectMenuItem() {
  const [open, setOpen] = useState(true);
  const projectInQuery = useProjectInQuery();
  const projects = projectInQuery.data?.data ?? [];
  const navigate = useNavigate();
  function handleClick() {
    setOpen(!open);
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <List />
        </ListItemIcon>
        <ListItemText primary="Switch to..." />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {projects.map((p) => (
            <ListItemButton sx={{ pl: 4 }} key={p._id}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={p.name} />
            </ListItemButton>
          ))}
          <ListItemButton sx={{ pl: 4 }} key="import">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Import a new project" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
