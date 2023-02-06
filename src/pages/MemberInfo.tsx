import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import { DataGrid, GridRowParams, GridSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router-dom";
import {
  assignTask,
  getMembersOfProject,
  markTask,
} from "~/actions/memberAction";
import { getTasks } from "~/actions/taskAction";
import FormWrapper from "~/components/common/FormWrapper";
import FullPageSkeleton from "~/components/common/FullPageSkeleton";
import TableTitle from "~/components/memberInfo/TableTitle";
import { IMember } from "~/interfaces/Member";
interface AssignTaskParams {
  taskId: string;
  memberId: string;
}
interface MarkTaskParams {
  taskIdArray: string[];
  status: string;
}
const ButtonRowBox = ({ children }: { children: JSX.Element[] }) => {
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
};
const MemberInfo = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [currentMember, setCurrentMember] = React.useState("");
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const [selectedRows, setSelectedRows] = React.useState<string[]>([""]);
  const assignTaskMutation = useMutation<unknown, Error, AssignTaskParams>({
    mutationFn: ({ taskId, memberId }) => assignTask(taskId, memberId),
    onSuccess: () => {
      enqueueSnackbar("Task assigned", { variant: "success" });
      queryClient.invalidateQueries(["memberList", currentProject]);
    },
  });
  const markTaskMutation = useMutation<unknown, Error, MarkTaskParams>({
    mutationFn: ({ taskIdArray, status }) => markTask(taskIdArray, status),
    onSuccess: () => {
      enqueueSnackbar("Task marked", { variant: "success" });
      queryClient.invalidateQueries(["memberList", currentProject]);
    },
  });
  const memberListQuery = useQuery(["memberList", currentProject], () =>
    getMembersOfProject(currentProject)
  );
  const taskQuery = useQuery(["taskList", currentProject], () =>
    getTasks(currentProject)
  );
  if (memberListQuery.isLoading || taskQuery.isLoading) {
    return <FullPageSkeleton />;
  }
  const memberList =
    memberListQuery.data === undefined ? [] : memberListQuery.data.data;
  const taskList = taskQuery.data === undefined ? [] : taskQuery.data.data;
  const activityHistoryColumns = [
    { field: "action", headerName: "Action", width: 200 },
    { field: "content", headerName: "Content", minWidth: 400, flex: 1 },
  ];
  const taskColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  const handleClick = (id: string) => {
    setOpen(true);
    setCurrentMember(id);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentMember("");
  };
  const handleAssignTask = async (params: GridRowParams) => {
    const { id } = params;
    const memberId = currentMember;
    assignTaskMutation.mutate({ taskId: id.toString(), memberId });
  };
  const getSelection = (arrayOfIds: GridSelectionModel) => {
    const array = arrayOfIds as string[];
    setSelectedRows(array);
  };
  const markAsComplete = async () => {
    markTaskMutation.mutate({ taskIdArray: selectedRows, status: "complete" });
  };
  const markAsIncomplete = async () => {
    markTaskMutation.mutate({ taskIdArray: selectedRows, status: "active" });
  };
  return (
    <Grid container spacing={2}>
      {memberList.map((member: IMember) => {
        const activityHistory = member.activityHistory;
        const tasks = member.taskAssigned;
        const id = member._id;
        return (
          <>
            <Grid item xs={2}>
              <Box sx={{ height: "100%" }}>
                <TableTitle>Member Info</TableTitle>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Member name: {member.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ height: "100%" }}>
                <TableTitle>Activity History</TableTitle>
                <DataGrid
                  getRowId={(row) => row._id}
                  rows={activityHistory}
                  columns={activityHistoryColumns}
                  autoHeight
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ height: "100%" }}>
                <Box>
                  <TableTitle>Tasks</TableTitle>
                  <DataGrid
                    getRowId={(row) => row._id}
                    rows={tasks}
                    columns={taskColumns}
                    autoHeight
                    checkboxSelection
                    onSelectionModelChange={getSelection}
                  />
                </Box>
                <ButtonRowBox>
                  <Button onClick={() => handleClick(id)}>Assign task</Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="lg"
                  >
                    <FormWrapper
                      title="Assign task"
                      closeDialogFunction={handleClose}
                    >
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
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};
export default MemberInfo;
