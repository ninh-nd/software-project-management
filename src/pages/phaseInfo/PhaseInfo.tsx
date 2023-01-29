import {
  ArticleOutlined,
  CreateOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import {
  addTaskToPhase,
  removeArtifactFromPhase,
  removeTaskFromPhase,
} from "~/actions/phaseAction";
import { getProjectInfo } from "~/actions/projectAction";
import { getTasks } from "~/actions/taskAction";
import AlertSnackbar from "~/components/common/AlertSnackbar";
import ConfirmDeleteModal from "~/components/phaseInfo/ConfirmDeleteModal";
import FullPageSkeleton from "~/components/common/FullPageSkeleton";
import CreateArtifactForm from "~/components/phaseInfo/CreateArtifactForm";
import CreatePhaseModel from "~/components/phaseInfo/CreatePhaseModel";
import { IPhase } from "~/interfaces/Phase";
import UpdateArtifactForm from "~/components/phaseInfo/UpdateArtifactForm";
import { IArtifact } from "~/interfaces/Artifact";
import { getArtifact } from "~/actions/artifactAction";
interface AddOrRemoveTaskToPhaseParams {
  phaseId: string;
  taskId: string;
}

const PhaseInfo = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
  const [openArtCreateDialog, setOpenArtCreateDialog] = React.useState(false);
  const [openArtUpdateDialog, setOpenArtUpdateDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    status: "success",
  });
  const [selectedPhase, setSelectedPhase] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<string[]>([""]);
  const [selectedArtifact, setSelectedArtifact] = React.useState("");
  const [confirmModal, setConfirmModal] = React.useState(false);
  const phaseQuery = useQuery(["phaseList", currentProject], () =>
    getProjectInfo(currentProject)
  );
  const taskQuery = useQuery(["taskList", currentProject], () =>
    getTasks(currentProject)
  );
  const getArtifactQuery = useQuery(["artifact", selectedArtifact], () =>
    getArtifact(selectedArtifact)
  );
  const addTaskMutation = useMutation<
    unknown,
    Error,
    AddOrRemoveTaskToPhaseParams
  >({
    mutationFn: ({ phaseId, taskId }) => addTaskToPhase(phaseId, taskId),
    onSuccess: () => {
      setOpenSnackbar({ open: true, status: "success" });
      queryClient.invalidateQueries(["phaseList", currentProject]);
    },
  });
  const removeTaskMutation = useMutation<
    unknown,
    Error,
    AddOrRemoveTaskToPhaseParams
  >({
    mutationFn: ({ phaseId, taskId }) => removeTaskFromPhase(phaseId, taskId),
    onSuccess: () => {
      setOpenSnackbar({ open: true, status: "success" });
      queryClient.invalidateQueries(["phaseList", currentProject]);
    },
  });
  if (phaseQuery.isLoading || taskQuery.isLoading) {
    return <FullPageSkeleton />;
  }
  const phaseList =
    phaseQuery.data === undefined ? [] : phaseQuery.data.data.phaseList;
  const taskList = taskQuery.data === undefined ? [] : taskQuery.data.data;
  const artifact =
    getArtifactQuery.data === undefined ? null : getArtifactQuery.data.data;
  const taskColumn: GridColumns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status" },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
  ];
  const artifactColumn: GridColumns = [
    { field: "name", headerName: "Name" },
    { field: "type", headerName: "Type" },
    { field: "url", headerName: "Url" },
    { field: "version", headerName: "Version" },
    {
      field: "threats",
      headerName: "Threats",
      flex: 1,
    },
    {
      field: "vulns",
      headerName: "Vulnerabilities",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<CreateOutlined />}
          onClick={handleUpdateSelectedArtifact(id)}
          label="Update"
        />,
        <GridActionsCellItem
          icon={<DeleteOutlined />}
          onClick={handleDeleteSelectedArtifact(id)}
          label="Delete"
        />,
      ],
    },
  ];
  const handleOpenTaskDialog = (id: string) => {
    setOpenTaskDialog(true);
    setSelectedPhase(id);
  };
  const closeTaskDialog = () => {
    setOpenTaskDialog(false);
    setOpenSnackbar({ open: false, status: "success" });
    setSelectedPhase("");
  };
  const openCreateArtDialog = (id: string) => {
    setOpenArtCreateDialog(true);
    setSelectedPhase(id);
  };
  const closeCreateArtDialog = () => {
    setOpenArtCreateDialog(false);
    setOpenSnackbar({ open: false, status: "success" });
    setSelectedPhase("");
  };
  const closeUpdateArtDialog = () => {
    setOpenArtUpdateDialog(false);
    setOpenSnackbar({ open: false, status: "success" });
    setSelectedPhase("");
  };
  const handleDoubleClick = async (params: GridRowParams) => {
    const { id } = params;
    const taskId = id.toString();
    const phaseId = selectedPhase;
    addTaskMutation.mutate({ phaseId, taskId });
  };
  const onTaskRowSelect = (arrayOfIds: GridSelectionModel) => {
    const array = arrayOfIds as string[];
    setSelectedRows(array);
  };
  const handleDeleteSelectedTask = (id: string) => {
    const phaseId = id;
    selectedRows.forEach((taskId) => {
      removeTaskMutation.mutate({ phaseId, taskId });
    });
  };
  const handleUpdateSelectedArtifact = (id: GridRowId) => () => {
    const combinedId = id as string; // combinedId contains both artifactId and phaseId as stated in the DataGrid
    const [artifactId, phaseId] = combinedId.split("-");
    setSelectedArtifact(artifactId);
    setSelectedPhase(phaseId);
    setOpenArtUpdateDialog(true);
  };
  const handleDeleteSelectedArtifact = (id: GridRowId) => () => {
    const combinedId = id as string; // combinedId contains both artifactId and phaseId as stated in the DataGrid
    const [artifactId, phaseId] = combinedId.split("-");
    setSelectedArtifact(artifactId);
    setSelectedPhase(phaseId);
    setConfirmModal(true);
  };
  const removeArtifact = async () => {
    const response = await removeArtifactFromPhase(
      selectedPhase,
      selectedArtifact
    );
    if (response.status === "success") {
      setOpenSnackbar({ open: true, status: "success" });
      queryClient.invalidateQueries(["phaseList", currentProject]);
    } else {
      setOpenSnackbar({ open: true, status: "error" });
    }
  };
  const phaseInfoRender = () => {
    return phaseList.map(({ _id, name, tasks, artifacts }: IPhase) => {
      const transformedArtifacts = artifacts.map((item) => {
        const { _id, name, content, type, url, version } = item;
        const threats = item.threatList.map((threat) => threat.name).join(", ");
        const vulns = item.vulnerabilityList
          .map((vuln) => vuln.cveId)
          .join(", ");
        return { _id, name, content, type, url, version, threats, vulns };
      });
      return (
        <Grid container spacing={2} sx={{ mb: "20px" }} key={_id}>
          <Grid item xs={6} sx={{ p: "20px" }}>
            <Card key={_id} sx={{ width: "100%" }}>
              <CardContent sx={{ height: "30vh" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {name}
                </Typography>
                <DataGrid
                  rows={tasks}
                  getRowId={(row) => row._id}
                  columns={taskColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  onSelectionModelChange={onTaskRowSelect}
                />
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpenTaskDialog(_id)}>
                  Add task
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDeleteSelectedTask(_id)}
                >
                  Delete selected task
                </Button>
                <Dialog
                  open={openTaskDialog}
                  onClose={closeTaskDialog}
                  fullWidth
                  maxWidth="lg"
                >
                  <DataGrid
                    rows={taskList}
                    columns={taskColumn}
                    autoHeight
                    onRowDoubleClick={handleDoubleClick}
                    getRowId={(row) => row._id}
                  />
                </Dialog>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card key={_id} sx={{ width: "100%" }}>
              <CardContent sx={{ height: "30vh" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Artifacts
                </Typography>
                <DataGrid
                  rows={transformedArtifacts}
                  getRowId={(row) => `${row._id}-${_id}`}
                  columns={artifactColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </CardContent>
              <CardActions>
                <Button onClick={() => openCreateArtDialog(_id)}>
                  Add artifact
                </Button>
                <Dialog
                  open={openArtCreateDialog}
                  onClose={closeCreateArtDialog}
                  fullWidth
                  maxWidth="lg"
                >
                  <CreateArtifactForm
                    phaseId={selectedPhase}
                    setCloseDialog={closeCreateArtDialog}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                </Dialog>
                <Dialog
                  open={openArtUpdateDialog}
                  onClose={closeUpdateArtDialog}
                  fullWidth
                  maxWidth="lg"
                >
                  {artifact === null ? null : (
                    <UpdateArtifactForm
                      phaseId={selectedPhase}
                      artifact={artifact}
                      setCloseDialog={closeUpdateArtDialog}
                      setOpenSnackbar={setOpenSnackbar}
                    />
                  )}
                </Dialog>
              </CardActions>
            </Card>
            <ConfirmDeleteModal
              open={confirmModal}
              setOpen={setConfirmModal}
              deleteFunction={removeArtifact}
            >
              Do you want to delete this artifact?
            </ConfirmDeleteModal>
          </Grid>
        </Grid>
      );
    });
  };
  if (phaseList.length === 0) return <CreatePhaseModel />;
  return (
    <Box sx={{ flexGrow: "1" }}>
      {phaseInfoRender()}
      <AlertSnackbar
        open={openSnackbar.open}
        onClose={() => setOpenSnackbar({ open: false, status: "success" })}
        status="success"
      />
    </Box>
  );
};
export default PhaseInfo;
