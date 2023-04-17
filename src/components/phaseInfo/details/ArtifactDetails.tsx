import { CreateOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useRemoveArtifactFromPhaseMutation } from "~/hooks/query";
import { IPhase } from "~/interfaces/Entity";
import FormWrapper from "../../common/FormWrapper";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CreateArtifactForm from "./CreateArtifactForm";
import UpdateArtifactForm from "./UpdateArtifactForm";

interface ArtifactDetailsProps {
  phase: IPhase;
}
export default function ArtifactDetails({ phase }: ArtifactDetailsProps) {
  const [openArtCreateDialog, setOpenArtCreateDialog] = useState(false);
  const [openArtUpdateDialog, setOpenArtUpdateDialog] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const transformedArtifacts = phase.artifacts.map((item) => {
    const { _id, name, content, type, url, version } = item;
    const threats = item.threatList.map((threat) => threat.name).join(", ");
    const vulns = item.vulnerabilityList.map((vuln) => vuln.cveId).join(", ");
    return { _id, name, content, type, url, version, threats, vulns };
  });
  function handleUpdateSelectedArtifact(id: GridRowId) {
    return () => {
      setSelectedArtifact(id as string);
      setOpenArtUpdateDialog(true);
    };
  }
  function handleDeleteSelectedArtifact(id: GridRowId) {
    return () => {
      setSelectedArtifact(id as string);
      setConfirmModal(true);
    };
  }
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
  const removeArtifactMutation = useRemoveArtifactFromPhaseMutation();
  async function removeArtifact() {
    if (selectedArtifact === "") return;
    removeArtifactMutation.mutate({
      phaseId: phase._id,
      artifactId: selectedArtifact,
    });
  }
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ height: "30vh" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Artifacts
        </Typography>
        <DataGrid
          rows={transformedArtifacts}
          getRowId={(row) => row._id}
          columns={artifactColumn}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </CardContent>
      <CardActions>
        <Button onClick={() => setOpenArtCreateDialog(true)}>
          Add artifact
        </Button>
        <Dialog
          open={openArtCreateDialog}
          onClose={() => setOpenArtCreateDialog(false)}
          fullWidth
          maxWidth="lg"
        >
          <FormWrapper
            title="Add artifact"
            closeDialogFunction={() => setOpenArtCreateDialog(false)}
          >
            <CreateArtifactForm
              phaseId={phase._id}
              setCloseDialog={() => setOpenArtCreateDialog(false)}
            />
          </FormWrapper>
        </Dialog>
        <Dialog
          open={openArtUpdateDialog}
          onClose={() => setOpenArtCreateDialog(false)}
          fullWidth
          maxWidth="lg"
        >
          <FormWrapper
            title="Update artifact"
            closeDialogFunction={() => setOpenArtUpdateDialog(false)}
          >
            <UpdateArtifactForm
              phaseId={phase._id}
              artifactId={selectedArtifact}
              setCloseDialog={() => setOpenArtUpdateDialog(false)}
            />
          </FormWrapper>
        </Dialog>
      </CardActions>
      <ConfirmDeleteModal
        open={confirmModal}
        setOpen={setConfirmModal}
        deleteFunction={removeArtifact}
      >
        Do you want to delete this artifact?
      </ConfirmDeleteModal>
    </Card>
  );
}
