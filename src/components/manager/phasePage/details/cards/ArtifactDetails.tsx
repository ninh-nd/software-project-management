import {
  Code,
  ContentPaste,
  CreateOutlined,
  DeleteOutlined,
  GridView,
  LibraryBooks,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRemoveArtifactFromPhaseMutation } from "~/hooks/query";
import { Docker } from "~/icons/Icons";
import { Phase } from "~/interfaces/Entity";
import ConfirmDeleteModal from "../forms/ConfirmDeleteModal";
import CreateArtifactForm from "../forms/CreateArtifactForm";
import UpdateArtifactForm from "../forms/UpdateArtifactForm";
function renderType({
  type,
}: {
  type: "image" | "log" | "source code" | "executable" | "library";
}) {
  switch (type) {
    case "image":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Image</Typography>
          <Docker />
        </Stack>
      );
    case "log":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Log</Typography>
          <ContentPaste />
        </Stack>
      );
    case "source code":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Source code</Typography>
          <Code />
        </Stack>
      );
    case "executable":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Executable</Typography>
          <GridView />
        </Stack>
      );
    case "library":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Library</Typography>
          <LibraryBooks />
        </Stack>
      );
  }
}
interface ArtifactDetailsProps {
  phase: Phase;
}
export default function ArtifactDetails({ phase }: ArtifactDetailsProps) {
  const [openArtCreateDialog, setOpenArtCreateDialog] = useState(false);
  const [openArtUpdateDialog, setOpenArtUpdateDialog] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  function handleUpdateSelectedArtifact(id: string) {
    return () => {
      setSelectedArtifact(id);
      setOpenArtUpdateDialog(true);
    };
  }
  function handleDeleteSelectedArtifact(id: string) {
    return () => {
      setSelectedArtifact(id);
      setConfirmModal(true);
    };
  }
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
      <CardContent
        sx={{
          minHeight: {
            md: 100,
            lg: 150,
          },
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Phase's artifacts
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {phase.artifacts.length > 0 ? (
            phase.artifacts.map((item) => (
              <Card key={item._id} sx={{ minWidth: "10%", m: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {renderType(item)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={handleUpdateSelectedArtifact(item._id)}>
                    <CreateOutlined />
                  </IconButton>
                  <IconButton onClick={handleDeleteSelectedArtifact(item._id)}>
                    <DeleteOutlined />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <Box display="flex" justifyContent="center" width="100%">
              <Typography variant="h6" component="div">
                There's no artifact...Add one by clicking the button below
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={() => setOpenArtCreateDialog(true)}>
          Add a new artifact
        </Button>
        <Dialog
          open={openArtCreateDialog}
          onClose={() => setOpenArtCreateDialog(false)}
          fullWidth
        >
          <CreateArtifactForm
            phaseId={phase._id}
            setCloseDialog={() => setOpenArtCreateDialog(false)}
          />
        </Dialog>
        <Dialog
          open={openArtUpdateDialog}
          onClose={() => setOpenArtCreateDialog(false)}
          fullWidth
        >
          <UpdateArtifactForm
            artifactId={selectedArtifact}
            setCloseDialog={() => setOpenArtUpdateDialog(false)}
          />
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
