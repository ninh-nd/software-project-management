import {
  CheckCircle,
  Delete,
  Edit,
  HourglassBottom,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAvailableTasksQuery, useDeleteTaskMutation } from "~/hooks/query";
import CreateTaskDialog from "./CreateTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import InfoPaper from "./InfoPaper";
import Title from "./Title";

export default function UnassignedTaskCard() {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | undefined>(
    undefined
  );
  const { currentProject } = useParams();
  if (!currentProject) {
    return <></>;
  }
  const deleteTaskMutation = useDeleteTaskMutation();
  const availableTasksQuery = useAvailableTasksQuery(currentProject);
  const availableTasks = availableTasksQuery.data?.data ?? [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", editable: true, flex: 0.3 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        const { value } = params;
        if (value === "active") {
          return <HourglassBottom />;
        } else if (value === "completed") {
          return <CheckCircle />;
        }
      },
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function handleEditClick(id: GridRowId) {
    return () => {
      setSelectedTask(id as string);
      setOpenEdit(true);
    };
  }
  function handleDeleteClick(id: GridRowId) {
    return () => {
      setSelectedTask(id as string);
      setOpenConfirmDelete(true);
    };
  }
  function deleteTask() {
    if (!selectedTask) return;
    deleteTaskMutation.mutate(selectedTask);
    setOpenConfirmDelete(false);
  }
  return (
    <>
      <Stack spacing={2}>
        <InfoPaper>
          <Title>Task ready to be assigned</Title>
          <DataGrid
            sx={{ minHeight: 500 }}
            rows={availableTasks}
            getRowId={(row) => row._id}
            columns={columns}
          />
        </InfoPaper>
        <InfoPaper>
          <Title>Actions</Title>
          <Box display="flex">
            <Button variant="contained" color="primary">
              Assign task
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCreate(true)}
              sx={{ ml: 1 }}
            >
              Create new task
            </Button>
          </Box>
        </InfoPaper>
      </Stack>
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Delete this task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button onClick={deleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>
      <CreateTaskDialog open={openCreate} setOpen={setOpenCreate} />
      <EditTaskDialog open={openEdit} setOpen={setOpenEdit} id={selectedTask} />
    </>
  );
}
