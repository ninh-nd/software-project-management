import { AssignmentInd, Task } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { useAssignTaskMutation, useAvailableTasksQuery } from "~/hooks/query";
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
const numberOfTaskPerPage = 5;
export default function TaskCard({ member }: { member: User }) {
  const [currentPage, setCurrentPage] = useState(0);
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const taskQuery = useAvailableTasksQuery(currentProject);
  const assignTaskList = taskQuery.data?.data ?? [];
  const visibility = assignTaskList.length > 0 ? "visible" : "hidden";
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value - 1);
  }
  const currentPageList = assignTaskList.slice(
    currentPage,
    currentPage + numberOfTaskPerPage
  );
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

  async function handleAssignTask(id: string) {
    assignTaskMutation.mutate({ taskId: id, memberId: member._id });
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
              <List>
                {currentPageList.map((task) => (
                  <ListItem
                    key={task._id}
                    secondaryAction={
                      <Tooltip title="Assign task to this member">
                        <IconButton
                          edge="end"
                          onClick={() => handleAssignTask(task._id)}
                        >
                          <AssignmentInd />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemIcon>
                      <Task />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.name}
                      secondary={task.description}
                    />
                  </ListItem>
                ))}
              </List>
              <Pagination
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  visibility,
                }}
                count={Math.ceil(assignTaskList.length / numberOfTaskPerPage)}
                onChange={handlePageChange}
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
