import { Typography, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import useProjectStore from '~/store/useStore';
const SelectProject = (): JSX.Element => {
    const currentProject = useProjectStore(state => state.currentProject);
    const projects = useProjectStore(state => state.projectList);
    const setCurrentProject = useProjectStore(state => state.setCurrentProject);
    const navigate = useNavigate();
    const handleChange = (event: SelectChangeEvent<string>) => {
        setCurrentProject(event.target.value);
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
