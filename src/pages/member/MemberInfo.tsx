import React from 'react'
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import '~/styles/style.scss';
import { Button, Snackbar, Alert, Dialog, Box, Skeleton, Paper, Typography } from '@mui/material';
import { assignTask, getMembersOfProject, markTask } from '~/actions/memberAction';
import { getTasks } from '~/actions/taskAction';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Title from '~/components/common/Title';
import { useParams } from 'react-router-dom';
interface AssignTaskParams {
    taskId: string;
    memberId: string;
}
interface MarkTaskParams {
    taskIdArray: string[];
    status: string;
}
const MemberInfo = (): JSX.Element => {
    const queryClient = useQueryClient();
    const [open, setOpen] = React.useState(false);
    const [currentMember, setCurrentMember] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const { currentProject } = useParams();
    if (currentProject === undefined) return <></>;
    const [selectedRows, setSelectedRows] = React.useState<string[]>(['']);
    const assignTaskMutation = useMutation<unknown, Error, AssignTaskParams>({
        mutationFn: ({ taskId, memberId }) => assignTask(taskId, memberId),
        onSuccess: () => {
            setOpenSnackbar(true);
            queryClient.invalidateQueries(['memberList', currentProject]);
        }
    })
    const markTaskMutation = useMutation<unknown, Error, MarkTaskParams>({
        mutationFn: ({ taskIdArray, status }) => markTask(taskIdArray, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['memberList', currentProject]);
        }
    })
    const memberListQuery = useQuery(['memberList', currentProject], () => getMembersOfProject(currentProject));
    const taskQuery = useQuery(['taskList', currentProject], () => getTasks(currentProject));
    if (memberListQuery.isLoading || taskQuery.isLoading) {
        return <Skeleton variant="rounded" className="fullPageSkeleton" />;
    }
    const memberList = memberListQuery.data === undefined ? [] : memberListQuery.data.data;
    const taskList = taskQuery.data === undefined ? [] : taskQuery.data.data;
    const activityHistoryColumns = [
        { field: 'action', headerName: 'Action', width: 200 },
        { field: 'content', headerName: 'Content', minWidth: 400, flex: 1 }
    ]
    const taskColumns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status' },
        { field: 'description', headerName: 'Description', minWidth: 400, flex: 1 }
    ]
    const handleClick = (id: string) => {
        setOpen(true);
        setCurrentMember(id);
    }
    const handleClose = () => {
        setOpen(false);
        setCurrentMember('');
        setOpenSnackbar(false);
    }
    const handleAssignTask = async (params: GridRowParams) => {
        const { id } = params;
        const memberId = currentMember;
        assignTaskMutation.mutate({ taskId: id.toString(), memberId });
    }
    const getSelection = (arrayOfIds: GridSelectionModel) => {
        const array = arrayOfIds as string[];
        setSelectedRows(array);
    }
    const markAsComplete = async () => {
        markTaskMutation.mutate({ taskIdArray: selectedRows, status: 'complete' });
    }
    const markAsIncomplete = async () => {
        markTaskMutation.mutate({ taskIdArray: selectedRows, status: 'active' });
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {memberList.map((member) => {
                const activityHistory = member.activityHistory;
                const tasks = member.taskAssigned;
                const id = member._id;
                return (
                    <Box key={member._id} className="box" component={Paper}>
                        <Box component={Paper} sx={{ height: '10vh', width: '10vw' }}>
                            <Title className="tableName">Member Info</Title>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Member name: {member.name}
                            </Typography>
                        </Box>
                        <Box component={Paper} sx={{ width: '30vw' }}>
                            <Title className="tableName">Activity History</Title>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={activityHistory}
                                columns={activityHistoryColumns}
                                autoHeight />
                        </Box>
                        <Box component={Paper} sx={{ width: '20vw' }}>
                            <Title className="tableName">Tasks</Title>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={tasks}
                                columns={taskColumns}
                                autoHeight
                                checkboxSelection
                                onSelectionModelChange={getSelection}
                            />
                            <Box className="buttonRow">
                                <Button onClick={() => handleClick(id)}>Assign task</Button>
                                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                                    <DataGrid
                                        rows={taskList}
                                        getRowId={(row) => row._id}
                                        columns={taskColumns}
                                        autoHeight
                                        onRowDoubleClick={handleAssignTask} />
                                </Dialog>
                                <Button onClick={markAsComplete}>Mark selected tasks as completed</Button>
                                <Button onClick={markAsIncomplete}>Mark selected tasks as active</Button>
                            </Box>
                        </Box>
                    </Box>
                )
            })}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">Task added successfully</Alert>
            </Snackbar>
        </Box >
    )
}
export default MemberInfo;