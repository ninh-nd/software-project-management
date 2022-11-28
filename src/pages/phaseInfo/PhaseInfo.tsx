import { Table, TableContainer, TableBody, TableRow, TableCell, Button, Dialog, Snackbar, Alert, Box, Skeleton } from '@mui/material';
import { Paper } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import React from 'react'
import { getProjectInfo } from '~/actions/projectAction';
import { getTasks } from '~/actions/taskAction';
import Project from '~/interfaces/Project';
import Task from '~/interfaces/Task';
import { addTaskToPhase } from '~/actions/phaseAction';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ServerResponse from '~/interfaces/ServerResponse';
import Title from '~/components/common/Title';
import '~/styles/style.scss';
import ErrorLoadingPage from '~/components/common/ErrorLoadingPage';
import { useParams } from 'react-router-dom';
interface AddTaskToPhaseParams {
    phaseId: string;
    taskId: string;
}

const PhaseInfo = (): JSX.Element => {
    const queryClient = useQueryClient();
    const { projectName: currentProject } = useParams();
    if (currentProject === undefined) return <></>;
    const [open, setOpen] = React.useState(false); // Dialog state
    const [openSnackbar, setOpenSnackbar] = React.useState(false); // Snackbar state
    const [currentPhase, setCurrentPhase] = React.useState(''); // Currently selected phase
    const phaseQuery = useQuery<ServerResponse<Project>>(['phaseList'], () => getProjectInfo(currentProject));
    const taskQuery = useQuery<ServerResponse<Task[]>>(['taskList'], () => getTasks());
    const mutation = useMutation<unknown, Error, AddTaskToPhaseParams>({
        mutationFn: ({ phaseId, taskId }) => addTaskToPhase(phaseId, taskId),
        onSuccess: () => {
            setOpenSnackbar(true);
            queryClient.invalidateQueries(['phaseList']);
        }
    })
    if (phaseQuery.isLoading || taskQuery.isLoading) {
        return <Skeleton variant="rounded" className="fullPageSkeleton" />;
    }
    if (phaseQuery.isError || taskQuery.isError) {
        return <ErrorLoadingPage />;
    }
    const phaseList = phaseQuery.data.data.phaseList;
    const taskList = taskQuery.data.data;
    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status' },
        { field: 'description', headerName: 'Description', minWidth: 400, flex: 1 }
    ]
    const handleClickOpen = (id: string) => {
        setOpen(true);
        setCurrentPhase(id);
    }
    const handleClose = () => {
        setOpen(false);
        setOpenSnackbar(false);
        setCurrentPhase('');
    }
    const handleDoubleClick = async (params: GridRowParams) => {
        const { id } = params;
        const taskId = id.toString();
        const phaseId = currentPhase;
        mutation.mutate({ phaseId, taskId });
    }
    function phaseInfoRender() {
        return phaseList.map(({ _id, name, tasks }) => (
            <TableRow key={_id}>
                <TableCell component="th" scope="row" align="center">
                    <Title>{name}</Title>
                </TableCell>
                <TableCell>
                    <Button onClick={() => handleClickOpen(_id)} >Add task</Button>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                        <DataGrid rows={taskList} columns={columns} autoHeight onRowDoubleClick={handleDoubleClick} getRowId={row => row._id} />
                    </Dialog>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={tasks}
                            getRowId={(row) => row._id}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Box>
                </TableCell>
            </TableRow>
        ))
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {phaseInfoRender()}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">Task added successfully</Alert>
            </Snackbar>
        </Box>
    )
}
export default PhaseInfo;