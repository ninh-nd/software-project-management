import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddTaskToPhaseMutation,
  useAvailableTasksQuery,
  useRemoveTaskFromPhaseMutation,
} from "~/hooks/query";
import { Phase } from "~/interfaces/Entity";
interface PhaseDetailsProps {
  phase: Phase;
}
export default function PhaseDetails({ phase }: PhaseDetailsProps) {
  const taskColumn: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  const { currentProject } = useParams();
  const taskQuery = useAvailableTasksQuery(currentProject);
  const availableTasks = taskQuery.data?.data ?? [];
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const addTaskMutation = useAddTaskToPhaseMutation();
  const removeTaskMutation = useRemoveTaskFromPhaseMutation();
  const [selectedRows, setSelectedRows] = useState<string[]>([""]);
  async function handleDoubleClick(params: GridRowParams) {
    const { id } = params;
    const phaseId = phase._id;
    const taskId = id.toString();
    addTaskMutation.mutate({ phaseId, taskId, currentProject });
  }
  function handleDeleteSelectedTask(id: string) {
    const phaseId = id;
    selectedRows.forEach((taskId) => {
      removeTaskMutation.mutate({ phaseId, taskId, currentProject });
    });
  }
  function onTaskRowSelect(arrayOfIds: GridRowSelectionModel) {
    const array = arrayOfIds as string[];
    setSelectedRows(array);
  }
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title="List of tasks to be done" />
      <CardContent
        sx={{
          minHeight: {
            md: 100,
            lg: 150,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          autoHeight
          rows={phase.tasks}
          getRowId={(row) => row._id}
          columns={taskColumn}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[]}
          onRowSelectionModelChange={onTaskRowSelect}
        />
      </CardContent>
      <CardActions>
        <Button onClick={() => setOpenTaskDialog(true)} variant="contained">
          Add new tasks
        </Button>
        <Button
          color="error"
          onClick={() => handleDeleteSelectedTask(phase._id)}
          variant="contained"
        >
          Remove selected tasks from phase
        </Button>
        <Dialog
          open={openTaskDialog}
          onClose={() => setOpenTaskDialog(false)}
          fullWidth
        >
          <DialogTitle>
            Adding tasks to phase: <b>{phase.name}</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Double click on a task to add it to this phase
            </DialogContentText>
            <DataGrid
              rows={availableTasks}
              columns={taskColumn}
              autoHeight
              onRowDoubleClick={handleDoubleClick}
              getRowId={(row) => row._id}
            />
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={() => setOpenTaskDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
