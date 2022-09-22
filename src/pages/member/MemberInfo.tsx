import React from 'react'
import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import './member.css';
import { Button, Snackbar, Alert, Dialog } from '@mui/material';
import useProjectStore from '../../store/useStore';
import { assignTask, getMembersOfProject, markTask } from '../../actions/memberAction';
import { getTasks } from '../../actions/taskAction';
import Member from '../../interfaces/Member';
import Task from '../../interfaces/Task';
const MemberInfo = (): JSX.Element => {
    const [memberList, setMemberList] = React.useState<Member[]>([{
        _id: '',
        name: '',
        taskAssigned: [],
        activityHistory: []
    }]);
    const [taskList, setTaskList] = React.useState<Task[]>([{
        _id: '',
        name: '',
        description: '',
        status: ''
    }]);
    const [open, setOpen] = React.useState(false);
    const [currentMember, setCurrentMember] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const currentProject = useProjectStore(state => state.currentProject);
    const [selectedRows, setSelectedRows] = React.useState<string[]>(['']);
    React.useEffect(() => {
        async function fetchData() {
            const res = await getTasks();
            const data = res.data;
            setTaskList(data);
        }
        async function getMemberList() {
            const res = await getMembersOfProject(currentProject);
            const memberList = res.data;
            setMemberList(memberList);
        }
        getMemberList();
        fetchData();
    }, [currentProject]);
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
        const response = await assignTask(id.toString(), memberId);
        if (response.status === 200) {
            setOpenSnackbar(true);
            //TODO: Re-render task list
        }
    }
    const getSelection = (arrayOfIds: GridSelectionModel) => {
        const array = arrayOfIds as string[];
        setSelectedRows(array);
    }
    const markAsComplete = async () => {
        selectedRows.forEach(async (id) => {
            // TODO: Frontend update state
            await markTask(id, 'complete');
        });
    }
    const markAsIncomplete = async () => {
        selectedRows.forEach(async (id) => {
            // TODO: Frontend update state
            await markTask(id, 'active');
        });
    }
    return (
        <div style={{ flex: 4 }}>
            {memberList.map((member) => {
                const activityHistory = member.activityHistory;
                const tasks = member.taskAssigned;
                const id = member._id;
                return (
                    <div key={member._id} className="box">
                        <div className="header">
                            Member's name: {member.name}
                        </div>
                        <div style={{ width: '100%' }}>
                            <div className="tableName">Activity History</div>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={activityHistory}
                                columns={activityHistoryColumns}
                                autoHeight />
                            <div className="tableName">Tasks</div>
                            <div className="buttonRow">
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
                            </div>
                            {tasks ? <DataGrid
                                getRowId={(row) => row._id}
                                rows={tasks}
                                columns={taskColumns}
                                autoHeight
                                checkboxSelection
                                onSelectionModelChange={getSelection}
                            /> : null}
                        </div>
                    </div>
                )
            })}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">Task added successfully</Alert>
            </Snackbar>
        </div>
    )
}
export default MemberInfo;