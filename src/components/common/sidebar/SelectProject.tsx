import {
  Typography,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProjectOwn } from "~/actions/projectManagerAction";
import { useProjectActions, useProjectHook } from "~/hooks/project";
export default function SelectProject() {
  const { setCurrentProject } = useProjectActions();
  const currentProject = useProjectHook();
  if (currentProject === undefined) {
    return <></>;
  }
  const projectOwnQuery = useQuery(["projectOwn"], () => getProjectOwn());
  let projects = projectOwnQuery.data?.data;
  if (projects === undefined || projects === null) {
    projects = [];
  }
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
