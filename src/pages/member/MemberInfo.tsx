import React from 'react'
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import '~/styles/style.scss';
import { Button, Snackbar, Alert, Dialog, Box, Skeleton } from '@mui/material';
import { assignTask, getMembersOfProject, markTask } from '~/actions/memberAction';
import { getTasks } from '~/actions/taskAction';
import Member from '~/interfaces/Member';
import Task from '~/interfaces/Task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ServerResponse from '~/interfaces/ServerResponse';
import Title from '~/components/common/Title';
import ErrorLoadingPage from '~/components/common/ErrorLoadingPage';
import { useCurrentProject } from '~/hooks/hooks';
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
    const currentProject = useCurrentProject();
    const [selectedRows, setSelectedRows] = React.useState<string[]>(['']);
    const assignTaskMutation = useMutation<unknown, Error, AssignTaskParams>({
        mutationFn: ({ taskId, memberId }) => assignTask(taskId, memberId),
        onSuccess: () => {
            setOpenSnackbar(true);
            queryClient.invalidateQueries(['memberList']);
        }
    })
    const markTaskMutation = useMutation<unknown, Error, MarkTaskParams>({
        mutationFn: ({ taskIdArray, status }) => markTask(taskIdArray, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['memberList']);
        }
    })
    const memberListQuery = useQuery<ServerResponse<Member[]>>(['memberList'], () => getMembersOfProject(currentProject));
    const taskQuery = useQuery<ServerResponse<Task[]>>(['taskList'], getTasks);
    if (memberListQuery.isLoading || taskQuery.isLoading) {
        return <Skeleton variant="rounded" className="fullPageSkeleton" />;
    }
    if (memberListQuery.isError || taskQuery.isError) {
        return <ErrorLoadingPage />;
    }
    const activityHistoryColumns = [
        { field: 'action', headerName: 'Action', width: 200 },
        { field: 'content', headerName: 'Content', minWidth: 400, flex: 1 },
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { field: 'updatedAt', headerName: 'Updated At', width: 200 }
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
        <Box sx={{ flexGrow: 1 }}>
            {memberListQuery.data.data.map((member) => {
                const activityHistory = member.activityHistory;
                const tasks = member.taskAssigned;
                const id = member._id;
                return (
                    <Box key={member._id} className="box">
                        <Title>
                            Member: {member.name}
                        </Title>
                        <Box style={{ width: '100%' }}>
                            <Title className="tableName">Activity History</Title>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={activityHistory}
                                columns={activityHistoryColumns}
                                autoHeight />
                            <Title className="tableName">Tasks</Title>
                            <Box className="buttonRow">
                                <Button onClick={() => handleClick(id)}>Assign task</Button>
                                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                                    <DataGrid
                                        rows={taskQuery.data.data}
                                        getRowId={(row) => row._id}
                                        columns={taskColumns}
                                        autoHeight
                                        onRowDoubleClick={handleAssignTask} />
                                </Dialog>
                                <Button onClick={markAsComplete}>Mark selected tasks as completed</Button>
                                <Button onClick={markAsIncomplete}>Mark selected tasks as active</Button>
                            </Box>
                            {tasks ? <DataGrid
                                getRowId={(row) => row._id}
                                rows={tasks}
                                columns={taskColumns}
                                autoHeight
                                checkboxSelection
                                onSelectionModelChange={getSelection}
                            /> : null}
                        </Box>
                    </Box>
                )
            })}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">Task added successfully</Alert>
            </Snackbar>
        </Box>
    )
}
export default MemberInfo;