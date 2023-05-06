import { MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProjectActions, useProjectHook } from "~/hooks/general";
import { useProjectInQuery } from "~/hooks/query";
export default function SelectProject() {
  const { control } = useForm();
  const { setCurrentProject } = useProjectActions();
  const currentProject = useProjectHook();
  const projectInQuery = useProjectInQuery();
  const projects = projectInQuery.data?.data ?? [];
  const navigate = useNavigate();
  function handleChange(event: SelectChangeEvent<string>) {
    setCurrentProject(event.target.value);
    navigate(`/${event.target.value}/`);
  }
  if (!currentProject) {
    return <></>;
  }
  return (
    <Controller
      name="project"
      control={control}
      defaultValue={currentProject}
      render={({ field: { onChange } }) => (
        <Select label="Project" fullWidth onChange={handleChange}>
          {projects.map((project) => {
            return (
              <MenuItem value={project.name} key={project.name}>
                {project.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    />
  );
}
