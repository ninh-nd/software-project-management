import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { useAssignTaskMutation, useTasksQuery } from "~/hooks/query";
import { User } from "~/interfaces/Entity";

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

export default function TaskCard({ member }: { member: User }) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const taskQuery = useTasksQuery(currentProject);
  const taskList = taskQuery.data?.data ?? [];
  const [open, setOpen] = useState(false);
  const taskColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  function handleClose() {
    setOpen(false);
  }

  const assignTaskMutation = useAssignTaskMutation();

  async function handleAssignTask(params: GridRowParams) {
    let { id } = params;
    id = id.toString();
    const memberId = member._id;
    assignTaskMutation.mutate({ taskId: id, memberId });
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
          />
        </Box>
        <ButtonRowBox>
          <Button onClick={() => setOpen(true)}>Assign task</Button>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Assign task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Double click on a task to assign it to {member.name}
              </DialogContentText>
              <DataGrid
                rows={taskList}
                getRowId={(row) => row._id}
                columns={taskColumns}
                autoHeight
                onRowDoubleClick={handleAssignTask}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </ButtonRowBox>
      </Box>
    </InfoPaper>
  );
}
