import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridRowParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router-dom";
import FormWrapper from "~/components/common/FormWrapper";
import {
  useAddTaskToPhaseMutation,
  useAvailableTasksQuery,
  useRemoveTaskFromPhaseMutation,
} from "~/hooks/query";
import { IPhase } from "~/interfaces/Phase";
interface PhaseDetailsProps {
  phase: IPhase;
}
export default function PhaseDetails({ phase }: PhaseDetailsProps) {
  const { enqueueSnackbar } = useSnackbar();
  const taskColumn: GridColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const taskQuery = useAvailableTasksQuery(currentProject);
  let availableTasks = taskQuery.data === undefined ? [] : taskQuery.data.data;
  if (availableTasks === null) {
    enqueueSnackbar(taskQuery.data?.message, { variant: "error" });
    availableTasks = [];
  }
  const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
  const addTaskMutation = useAddTaskToPhaseMutation();
  const removeTaskMutation = useRemoveTaskFromPhaseMutation();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([""]);
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
  function onTaskRowSelect(arrayOfIds: GridSelectionModel) {
    const array = arrayOfIds as string[];
    setSelectedRows(array);
  }
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ height: "30vh" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {phase.name}
        </Typography>
        <DataGrid
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
        <Button onClick={() => setOpenTaskDialog(true)}>Add task</Button>
        <Button
          color="error"
          onClick={() => handleDeleteSelectedTask(phase._id)}
        >
          Delete selected task
        </Button>
        <Dialog
          open={openTaskDialog}
          onClose={() => setOpenTaskDialog(false)}
          fullWidth
          maxWidth="lg"
        >
          <FormWrapper
            title="Add task"
            closeDialogFunction={() => setOpenTaskDialog(false)}
          >
            <DataGrid
              rows={availableTasks}
              columns={taskColumn}
              autoHeight
              onRowDoubleClick={handleDoubleClick}
              getRowId={(row) => row._id}
            />
          </FormWrapper>
        </Dialog>
      </CardActions>
    </Card>
  );
}
