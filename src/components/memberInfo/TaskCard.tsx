import { Box, Button, Dialog } from "@mui/material";
import { DataGrid, GridRowParams, GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAssignTaskMutation,
  useMarkTaskMutation,
  useTasksQuery,
} from "~/hooks/query";
import { IUser } from "~/interfaces/Entity";
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

export default function TaskCard({ member }: { member: IUser }) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const taskQuery = useTasksQuery(currentProject);
  const taskList = taskQuery.data?.data ?? [];
  const [selectedRows, setSelectedRows] = useState<string[]>([""]);
  const [open, setOpen] = useState(false);
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

  const markTaskMutation = useMarkTaskMutation();

  const assignTaskMutation = useAssignTaskMutation();

  async function handleAssignTask(params: GridRowParams) {
    let { id } = params;
    id = id.toString();
    const memberId = member._id;
    assignTaskMutation.mutate({ taskId: id, memberId });
  }

  function markAsComplete() {
    markTaskMutation.mutate({
      taskIdArray: selectedRows,
      status: "completed",
      memberId: member._id,
    });
  }
  function markAsIncomplete() {
    markTaskMutation.mutate({
      taskIdArray: selectedRows,
      status: "active",
      memberId: member._id,
    });
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
