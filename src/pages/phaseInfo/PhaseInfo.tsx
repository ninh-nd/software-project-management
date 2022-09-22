import { Table, TableContainer, TableBody, TableRow, TableCell, Button, Dialog, Snackbar, Alert } from '@mui/material';
import { Paper } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import React from 'react'
import axios from '../../api';
import useProjectStore from '../../store/useStore';
import { getProjectInfo } from '../../actions/projectAction';
import { getTasks } from '../../actions/taskAction';
import Phase from '../../interfaces/Phase';
import Task from '../../interfaces/Task';
const PhaseInfo = (): JSX.Element => {
    const currentProject = useProjectStore(state => state.currentProject);
    const [phaseInfo, setPhaseInfo] = React.useState<Phase[]>([{
        _id: '',
        name: '',
        tasks: []
    }]); // Phase list 
    const [rows, setRows] = React.useState<Task[]>([]); // Task table 
    const [open, setOpen] = React.useState(false); // Dialog state
    const [openSnackbar, setOpenSnackbar] = React.useState(false); // Snackbar state
    const [currentPhase, setCurrentPhase] = React.useState(''); // Currently selected phase
    async function getPhaseInfo() {
        const response = await getProjectInfo(currentProject);
        const data = response.data;
        const phaseList = data.phaseList;
        setPhaseInfo(phaseList);
    }
    async function fetchData() {
        const res = await getTasks();
        const data = res.data;
        setRows(data);
    }
    React.useEffect(() => {
        getPhaseInfo();
        fetchData();
    }, [currentProject]);
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
        const phaseId = currentPhase;
        const response = await axios.patch(`/phase/${phaseId}/task`, {
            taskId: id
        });
        if (response.status === 200) {
            setOpenSnackbar(true);
            await getPhaseInfo();
        }
    }
    function phaseInfoRender() {
        return phaseInfo.map(({ _id, name, tasks }) => (
            <TableRow key={_id}>
                <TableCell component="th" scope="row" align="center">
                    {name}
                </TableCell>
                <td>
                    <Button onClick={() => handleClickOpen(_id)} >Add task</Button>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                        <DataGrid rows={rows} columns={columns} autoHeight onRowDoubleClick={handleDoubleClick} />
                    </Dialog>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={tasks}
                            getRowId={(row) => row._id}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                </td>
            </TableRow>
        ))
    }
    return (
        <div style={{ flex: 4 }}>
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
        </div>
    )
}
export default PhaseInfo;