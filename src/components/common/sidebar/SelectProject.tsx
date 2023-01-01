import { Typography, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectOwn } from '~/actions/projectManagerAction';
import Project from '~/interfaces/Project';
import ServerResponse from '~/interfaces/ServerResponse';
const SelectProject = (): JSX.Element => {
    const { currentProject } = useParams();
    if (currentProject === undefined) {
        return <></>;
    }
    const projectOwnQuery = useQuery(['projectOwn'], () => getProjectOwn())
    const projects = projectOwnQuery.data === undefined ? [] : projectOwnQuery.data.data
    const navigate = useNavigate();
    const handleChange = (event: SelectChangeEvent<string>) => {
        navigate(`/${event.target.value}`);
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
