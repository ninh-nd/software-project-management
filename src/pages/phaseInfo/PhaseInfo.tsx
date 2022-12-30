import { Button, Dialog, Snackbar, Alert, Box, Skeleton, Card, CardContent, Typography, CardActions } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import React from 'react'
import { getProjectInfo } from '~/actions/projectAction';
import { getTasks } from '~/actions/taskAction';
import Project from '~/interfaces/Project';
import { Task } from '~/interfaces/Task';
import { addTaskToPhase } from '~/actions/phaseAction';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ServerResponse from '~/interfaces/ServerResponse';
import '~/styles/style.scss';
import { useParams } from 'react-router-dom';
interface AddTaskToPhaseParams {
    phaseId: string;
    taskId: string;
}

const PhaseInfo = (): JSX.Element => {
    const queryClient = useQueryClient();
    const { currentProject } = useParams();
    if (currentProject === undefined) return <></>;
    const [open, setOpen] = React.useState(false); // Dialog state
    const [openSnackbar, setOpenSnackbar] = React.useState(false); // Snackbar state
    const [currentPhase, setCurrentPhase] = React.useState(''); // Currently selected phase
    const phaseQuery = useQuery<ServerResponse<Project>>(['phaseList'], () => getProjectInfo(currentProject));
    const taskQuery = useQuery<ServerResponse<Task[]>>(['taskList'], () => getTasks(currentProject));
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
    const phaseList = phaseQuery.data === undefined ? [] : phaseQuery.data.data.phaseList;
    const taskList = taskQuery.data === undefined ? [] : taskQuery.data.data;
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
            <Card key={_id} sx={{ width: '20vw' }}>
                <CardContent sx={{ height: '30vh' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {name}
                    </Typography>
                    <DataGrid
                        rows={tasks}
                        getRowId={(row) => row._id}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleClickOpen(_id)} >Add task</Button>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                        <DataGrid rows={taskList} columns={columns} autoHeight onRowDoubleClick={handleDoubleClick} getRowId={row => row._id} />
                    </Dialog>
                </CardActions>
            </Card>
        ))
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: '1' }}>
            {phaseInfoRender()}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">Task added successfully</Alert>
            </Snackbar>
        </Box>
    )
}
export default PhaseInfo;