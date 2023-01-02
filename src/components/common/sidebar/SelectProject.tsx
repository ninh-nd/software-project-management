import { Typography, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProjectOwn } from '~/actions/projectManagerAction';
import { useProjectActions, useProjectHook } from '~/hooks/project';
const SelectProject = (): JSX.Element => {
    const { setCurrentProject } = useProjectActions();
    const currentProject = useProjectHook();
    if (currentProject === undefined) {
        return <></>;
    }
    const projectOwnQuery = useQuery(['projectOwn'], () => getProjectOwn())
    const projects = projectOwnQuery.data === undefined ? [] : projectOwnQuery.data.data
    const navigate = useNavigate();
    const handleChange = (event: SelectChangeEvent<string>) => {
        setCurrentProject(event.target.value);
        navigate(`/${event.target.value}/`);
    }
    return (
        <>
            <Typography variant="caption" >Select project</Typography>
            <FormControl fullWidth>
                <Select label="Project" onChange={handleChange} value={currentProject}>
                    {projects.map(project => {
                        return <MenuItem value={project.name} key={project.name}>{project.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </>
    )
}
export default SelectProject;
