import { Table, TableContainer, TableBody, TableRow, TableCell } from '@mui/material';
import React from 'react'
import { Paper } from '@mui/material';
import { getProjectInfo } from '../../actions/projectAction';
import useStore from '../../store/useStore';
import Project from '../../interfaces/Project';
const ProjectInfo = (): JSX.Element => {
    const currentProject = useStore(state => state.currentProject);
    const [projectInfo, setProjectInfo] = React.useState<Project>({ name: '', url: '', status: '', createdAt: '', updatedAt: '', phaseList: [] });
    React.useEffect(() => {
        async function fetchData() {
            const res = await getProjectInfo(currentProject);
            const projectInfo = res.data;
            setProjectInfo(projectInfo);
        }
        fetchData();
    }, [currentProject]);
    return (
        <div style={{ flex: 4 }}>
            <TableContainer component={Paper}>
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
                            <TableCell align="right"><a href="{projectInfo.url}">{projectInfo.url}</a></TableCell>
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
        </div>
    )
}
export default ProjectInfo;