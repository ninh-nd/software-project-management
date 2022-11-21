import { Table, TableContainer, TableBody, TableRow, TableCell, Skeleton } from '@mui/material';
import { Paper } from '@mui/material';
import { getProjectInfo } from '~/actions/projectAction';
import Project from '~/interfaces/Project';
import { useQuery } from '@tanstack/react-query';
import ServerResponse from '~/interfaces/ServerResponse';
import '~/styles/style.scss';
import ErrorLoadingComponent from '~/components/common/ErrorLoadingComponent';
import { useCurrentProject } from '~/hooks/hooks';
const ProjectInfo = (): JSX.Element => {
    const currentProject = useCurrentProject();
    const projectInfoQuery = useQuery<ServerResponse<Project>>(['projectInfo'], () => getProjectInfo(currentProject));
    if (projectInfoQuery.isLoading) {
        return <Skeleton variant="rounded" className="paper" height={200} />;
    }
    if (projectInfoQuery.isError) {
        return <ErrorLoadingComponent />;
    }
    return (
        <Paper className="paper">
            <TableContainer>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Project Name
                            </TableCell>
                            <TableCell align="right">{projectInfoQuery.data.data.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                URL
                            </TableCell>
                            <TableCell align="right"><a href="{projectInfo.url}">{projectInfoQuery.data.data.url}</a></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Status
                            </TableCell>
                            <TableCell align="right">{projectInfoQuery.data.data.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Created at
                            </TableCell>
                            <TableCell align="right">{projectInfoQuery.data.data.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Updated at
                            </TableCell>
                            <TableCell align="right">{projectInfoQuery.data.data.updatedAt}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default ProjectInfo;