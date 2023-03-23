import { Box, Button, Dialog } from "@mui/material";
import { DataGrid, GridRowParams, GridSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router-dom";
import { assignTask, markTask } from "~/actions/memberAction";
import { getAllTasks } from "~/actions/taskAction";
import { IMember } from "~/interfaces/Member";
import FormWrapper from "../common/FormWrapper";
import Title from "../common/Title";
import InfoPaper from "../home/InfoPaper";

function ButtonRowBox({ children }: { children: JSX.Element[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Box>
  );
}

interface AssignTaskParams {
  taskId: string;
  memberId: string;
}
interface MarkTaskParams {
  taskIdArray: string[];
  status: string;
}

export default function TaskCard({ member }: { member: IMember }) {
  const { currentProject } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  if (currentProject === undefined) return <></>;
  const taskQuery = useQuery(["taskList", currentProject], () =>
    getAllTasks(currentProject)
  );
  let taskList = taskQuery.data === undefined ? [] : taskQuery.data.data;
  if (taskList === null) {
    taskList = [];
    enqueueSnackbar(taskQuery.data?.message, { variant: "error" });
  }
  const [selectedRows, setSelectedRows] = React.useState<string[]>([""]);
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const taskColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  function handleClose() {
    setOpen(false);
  }
  function getSelection(arrayOfIds: GridSelectionModel) {
    const array = arrayOfIds as string[];
    setSelectedRows(array);
  }
  const assignTaskMutation = useMutation({
    mutationFn: ({ taskId, memberId }: AssignTaskParams) =>
      assignTask(taskId, memberId),
    onSuccess: () => {
      enqueueSnackbar("Task assigned", { variant: "success" });
      queryClient.invalidateQueries(["member", member._id]);
    },
  });
  const markTaskMutation = useMutation({
    mutationFn: ({ taskIdArray, status }: MarkTaskParams) =>
      markTask(taskIdArray, status),
    onSuccess: () => {
      enqueueSnackbar("Task marked", { variant: "success" });
      queryClient.invalidateQueries(["member", member._id]);
    },
  });

  async function handleAssignTask(params: GridRowParams) {
    const { id } = params;
    const memberId = member._id;
    assignTaskMutation.mutate({ taskId: id.toString(), memberId });
  }

  async function markAsComplete() {
    markTaskMutation.mutate({ taskIdArray: selectedRows, status: "complete" });
  }
  async function markAsIncomplete() {
    markTaskMutation.mutate({ taskIdArray: selectedRows, status: "active" });
  }

  return (
    <InfoPaper>
      <Title>Tasks</Title>
      <Box sx={{ height: "100%" }}>
        <Box>
          <DataGrid
            getRowId={(row) => row._id}
            rows={member.taskAssigned}
            columns={taskColumns}
            autoHeight
            checkboxSelection
            onSelectionModelChange={getSelection}
          />
        </Box>
        <ButtonRowBox>
          <Button onClick={() => setOpen(true)}>Assign task</Button>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <FormWrapper title="Assign task" closeDialogFunction={handleClose}>
              <DataGrid
                rows={taskList}
                getRowId={(row) => row._id}
                columns={taskColumns}
                autoHeight
                onRowDoubleClick={handleAssignTask}
              />
            </FormWrapper>
          </Dialog>
          <Button onClick={markAsComplete}>
            Mark selected tasks as completed
          </Button>
          <Button onClick={markAsIncomplete}>
            Mark selected tasks as active
          </Button>
        </ButtonRowBox>
      </Box>
    </InfoPaper>
  );
}
