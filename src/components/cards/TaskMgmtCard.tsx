import {
  Add,
  CheckCircle,
  Delete,
  Edit,
  HourglassBottom,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  SxProps,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AssignTaskDialog from "~/components/dialogs/AssignTaskDialog";
import ConfirmActionDialog from "~/components/dialogs/ConfirmActionDialog";
import CreateTaskDialog from "~/components/dialogs/CreateTaskDialog";
import EditTaskDialog from "~/components/dialogs/EditTaskDialog";
import {
  useDeleteTaskMutation,
  useTasksQuery,
} from "~/hooks/fetching/task/query";

export default function TaskMgmtCard({ sx }: { sx?: SxProps }) {
  const { currentProject } = useParams();
  const [openAssign, setOpenAssign] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | undefined>(
    undefined
  );
  const deleteTaskMutation = useDeleteTaskMutation();
  const availableTasksQuery = useTasksQuery(currentProject);
  const availableTasks = availableTasksQuery.data?.data ?? [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", editable: true, flex: 1 },
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
      field: "dueDate",
      headerName: "Due date",
      editable: true,
      renderCell: (params) => {
        return dayjs(params.value as string).format("DD/MM/YYYY");
      },
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
  }
  return (
    <Card sx={sx}>
      <CardHeader title="Dangling tasks" />
      <CardContent sx={{ height: 350 }}>
        <DataGrid
          rows={availableTasks}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={() => setOpenAssign(true)}
          startIcon={<Add />}
          color="inherit"
        >
          Assign task
        </Button>
        <Button
          onClick={() => setOpenCreate(true)}
          startIcon={<Add />}
          color="success"
        >
          Create new task
        </Button>
      </CardActions>
      <ConfirmActionDialog
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        callback={deleteTask}
        text="Are you sure you want to delete this task?"
      />
      <EditTaskDialog open={openEdit} setOpen={setOpenEdit} id={selectedTask} />
      <CreateTaskDialog open={openCreate} setOpen={setOpenCreate} />
      <AssignTaskDialog open={openAssign} setOpen={setOpenAssign} />
    </Card>
  );
}
