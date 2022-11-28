import { Typography, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectActions, useProjectList } from '~/hooks/hooks';
const SelectProject = (): JSX.Element => {
    const { currentProject } = useParams();
    if (currentProject === undefined) {
        return <></>;
    }
    const projects = useProjectList();
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
