import { Table, TableContainer, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper } from '@mui/material';
import { getProjectInfo } from '../../actions/projectAction';
import useStore from '../../store/useStore';
import Project from '../../interfaces/Project';
import { useQuery } from '@tanstack/react-query';
import ServerResponse from '../../interfaces/ServerResponse';
const ProjectInfo = (): JSX.Element => {
    const currentProject = useStore(state => state.currentProject);
    const projectInfo = useQuery<ServerResponse<Project>>(['projectInfo'], () => getProjectInfo(currentProject));
    if (projectInfo.isLoading) {
        return <div>Loading...</div>;
    }
    if (projectInfo.isError) {
        return <div>Error</div>;
    }
    return (
        <div style={{ flex: 4 }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Project Name
                            </TableCell>
                            <TableCell align="right">{projectInfo.data.data.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                URL
                            </TableCell>
                            <TableCell align="right"><a href="{projectInfo.url}">{projectInfo.data.data.url}</a></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Status
                            </TableCell>
                            <TableCell align="right">{projectInfo.data.data.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Created at
                            </TableCell>
                            <TableCell align="right">{projectInfo.data.data.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Updated at
                            </TableCell>
                            <TableCell align="right">{projectInfo.data.data.updatedAt}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default ProjectInfo;