import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectActions, useProjectHook } from "~/hooks/project";
import { useProjectOwnQuery } from "~/hooks/query";
export default function SelectProject() {
  const { setCurrentProject } = useProjectActions();
  const currentProject = useParams();
  if (!currentProject) {
    return <></>;
  }
  const projectOwnQuery = useProjectOwnQuery();
  const projects = projectOwnQuery.data?.data ?? [];
  const navigate = useNavigate();
  function handleChange(event: SelectChangeEvent<string>) {
    setCurrentProject(event.target.value);
    navigate(`/${event.target.value}/`);
  }
  return (
    <>
      <Typography variant="caption">Select project</Typography>
      <FormControl fullWidth>
        <Select label="Project" onChange={handleChange} value={currentProject}>
          {projects.map((project) => {
            return (
              <MenuItem value={project.name} key={project.name}>
                {project.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
