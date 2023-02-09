/* Not type-safe component */
import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowsProp,
  GridRowModesModel,
  GridRowParams,
  GridRowId,
  GridRowModel,
  MuiEvent,
  MuiBaseEvent,
  GridColumns,
} from "@mui/x-data-grid";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "~/actions/taskAction";
import { useParams } from "react-router-dom";
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const addRecord = () => {
    const id = Date.now().toString(); // Generate a random id for frontend usage only
    setRows((oldRows) => [
      ...oldRows,
      { _id: id, name: "", description: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={addRecord}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const TaskInfo = (): JSX.Element => {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { currentProject } = useParams();
  if (currentProject === undefined) {
    return <></>;
  }
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getTasks(currentProject);
      const tasks = data.data;
      setRows(tasks);
    };
    fetchData();
  }, []);
  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<MuiBaseEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = async (
    params: GridRowParams,
    event: MuiEvent<MuiBaseEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    /* FRONTEND DELETE */
    setRows(rows.filter((row) => row._id !== id));
    /* BACKEND DELETE */
    const idAsString = id as string;
    await deleteTask(idAsString);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const username = localStorage.getItem("username") || "";
    /* Add a new row */
    if (newRow.isNew) {
      // Update row to the server
      const task = {
        name: newRow.name,
        description: newRow.description,
        status: newRow.status,
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
  };

  const columns: GridColumns = [
    { field: "name", headerName: "Name", editable: true, flex: 0.3 },
    { field: "status", headerName: "Status", editable: true },
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
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
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
      components={{
        Toolbar: EditToolbar,
      }}
      componentsProps={{
        toolbar: { setRows, setRowModesModel },
      }}
      experimentalFeatures={{ newEditingApi: true }}
    />
  );
};
export default TaskInfo;
