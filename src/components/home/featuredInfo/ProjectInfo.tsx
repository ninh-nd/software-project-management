import { Table, TableContainer, TableBody, TableRow, TableCell, Skeleton, Link } from '@mui/material';
import { Paper } from '@mui/material';
import { getProjectInfo } from '~/actions/projectAction';
import Project from '~/interfaces/Project';
import { useQuery } from '@tanstack/react-query';
import ServerResponse from '~/interfaces/ServerResponse';
import '~/styles/style.scss';
import { useParams } from 'react-router-dom';
const ProjectInfo = (): JSX.Element => {
    const { currentProject } = useParams();
    if (currentProject === undefined) return <></>;
    const projectInfoQuery = useQuery<ServerResponse<Project>>(['projectInfo'], () => getProjectInfo(currentProject));
    if (projectInfoQuery.isLoading) {
        return <Skeleton variant="rounded" className="paper" height={200} />;
    }
    const projectInfo = projectInfoQuery.data === undefined ? { name: '', url: '', status: '', createdAt: '', updatedAt: '', phaseList: [] } : projectInfoQuery.data.data;
    return (
        <Paper className="paper">
            <TableContainer>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Project Name
                            </TableCell>
                            <TableCell align="right">{projectInfo.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                URL
                            </TableCell>
                            <TableCell align="right"><Link href={projectInfo.url} target="_blank" rel="noopener">{projectInfo.url}</Link></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Status
                            </TableCell>
                            <TableCell align="right">{projectInfo.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Created at
                            </TableCell>
                            <TableCell align="right">{projectInfo.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Updated at
                            </TableCell>
                            <TableCell align="right">{projectInfo.updatedAt}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default ProjectInfo;