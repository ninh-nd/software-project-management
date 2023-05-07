import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProjectInQuery } from "~/hooks/query";
export default function SelectProject() {
  const [value, setValue] = useState("");
  const { getValues, register } = useForm<{ projectName: string }>();
  const projectInQuery = useProjectInQuery();
  const projects = projectInQuery.data?.data ?? [];
  const navigate = useNavigate();
  function handleChange() {
    const project = getValues("projectName");
    navigate(`/${project}/`);
    setValue("");
  }
  return (
    <FormControl fullWidth>
      <InputLabel>Select a project</InputLabel>
      <Select
        {...register("projectName", { onChange: (e) => handleChange() })}
        label="Project"
        value={value}
        fullWidth
      >
        {projects.map((project, index) => {
          return (
            <MenuItem value={project.name} key={index}>
              {project.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
