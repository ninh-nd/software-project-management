import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridRowParams,
  GridSelectionModel,
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
  const taskColumn: GridColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
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
    if (!currentProject) return;
    addTaskMutation.mutate({ phaseId, taskId, currentProject });
  }
  function handleDeleteSelectedTask(id: string) {
    const phaseId = id;
    if (!currentProject) return;
    selectedRows.forEach((taskId) => {
      removeTaskMutation.mutate({ phaseId, taskId, currentProject });
    });
  }
  function onTaskRowSelect(arrayOfIds: GridSelectionModel) {
    const array = arrayOfIds as string[];
    setSelectedRows(array);
  }
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent
        sx={{
          minHeight: {
            md: 100,
            lg: 150,
          },
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          List of tasks to be done in this phase
        </Typography>
        <DataGrid
          autoHeight
          rows={phase.tasks}
          getRowId={(row) => row._id}
          columns={taskColumn}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={onTaskRowSelect}
        />
      </CardContent>
      <CardActions>
        <Button onClick={() => setOpenTaskDialog(true)}>Add new tasks</Button>
        <Button
          color="error"
          onClick={() => handleDeleteSelectedTask(phase._id)}
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
