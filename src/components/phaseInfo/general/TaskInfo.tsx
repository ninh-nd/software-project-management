/* Not type-safe component */
import { Add, Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  MuiBaseEvent,
  MuiEvent,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createTask,
  deleteTask,
  getAvailableTasks,
  updateTask,
} from "~/actions/taskAction";
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  function addRecord() {
    const id = Date.now().toString(); // Generate a random id for frontend usage only
    setRows((oldRows) => [
      ...oldRows,
      { _id: id, name: "", description: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />} onClick={addRecord}>
        Add a new task
      </Button>
    </GridToolbarContainer>
  );
}

export default function TaskInfo() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { currentProject } = useParams();
  if (!currentProject) {
    return <></>;
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAvailableTasks(currentProject);
      const tasks = data.data;
      if (!tasks) setRows([]);
      else setRows(tasks);
    };
    fetchData();
  }, []);
  function handleRowEditStart(
    params: GridRowParams,
    event: MuiEvent<MuiBaseEvent>
  ) {
    event.defaultMuiPrevented = true;
  }

  async function handleRowEditStop(
    params: GridRowParams,
    event: MuiEvent<MuiBaseEvent>
  ) {
    event.defaultMuiPrevented = true;
  }

  function handleEditClick(id: GridRowId) {
    return () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  }

  function handleSaveClick(id: GridRowId) {
    return async () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  }

  function handleDeleteClick(id: GridRowId) {
    return async () => {
      /* FRONTEND DELETE */
      setRows(rows.filter((row) => row._id !== id));
      /* BACKEND DELETE */
      const idAsString = id as string;
      await deleteTask(idAsString);
    };
  }

  function handleCancelClick(id: GridRowId) {
    return () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row._id === id);
      if (editedRow?.isNew) {
        setRows(rows.filter((row) => row._id !== id));
      }
    };
  }

  async function processRowUpdate(newRow: GridRowModel) {
    const updatedRow = { ...newRow, isNew: false };
    const username = localStorage.getItem("username") || "";
    if (!currentProject) return;
    /* Add a new row */
    if (newRow.isNew) {
      // Update row to the server
      const task = {
        name: newRow.name,
        description: newRow.description,
        status: "active",
        createdBy: username,
        projectName: currentProject,
      };
      await createTask(task);
    } else {
      /* Update an existing row */
      const task = {
        name: newRow.name,
        description: newRow.description,
        status: newRow.status,
        updatedBy: username,
        projectName: currentProject,
      };
      await updateTask(task, newRow._id);
    }
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    return updatedRow;
  }

  const columns = [
    { field: "name", headerName: "Name", editable: true, flex: 0.3 },
    {
      field: "status",
      headerName: "Status",
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
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

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

  return (
    <Card>
      <CardHeader title="Tasks ready to be assigned" />
      <CardContent>
        <DataGrid
          sx={{ minHeight: 500 }}
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </CardContent>
    </Card>
  );
}
