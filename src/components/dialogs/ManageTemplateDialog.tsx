import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePhaseTemplatesQuery } from "~/hooks/fetching/phase/query";
import { useAccountContext } from "~/hooks/general";
import PhaseTemplateDetailsDialog from "./PhaseTemplateDetailsDialog";
import { Add } from "@mui/icons-material";
import CreateNewTemplateDialog from "./CreateNewTemplateDialog";
export default function ManageTemplateDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const accountContext = useAccountContext();
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const templatesQuery = usePhaseTemplatesQuery();
  const templates =
    templatesQuery.data?.data?.filter(
      (x) => x.createdBy == accountContext.username
    ) ?? [];
  async function editTemplate(id: string) {
    setSearchParams({ templateId: id });
    setOpenEdit(true);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <DialogTitle>Manage templates</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction="row">
          {templates.map((temp) => {
            return (
              <Card sx={{ m: 1, minWidth: 300 }} key={temp.name}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {temp.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {temp.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => editTemplate(temp._id)}>
                    Edit
                  </Button>
                  <PhaseTemplateDetailsDialog
                    open={openEdit}
                    setOpen={setOpenEdit}
                  />
                </CardActions>
              </Card>
            );
          })}
          <Card sx={{ m: 1, minWidth: 300 }} key="add">
            <CardContent sx={{ height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button
                  startIcon={<Add fontSize="large" />}
                  onClick={() => setOpenCreate(true)}
                >
                  Add a new template
                </Button>
                <CreateNewTemplateDialog
                  open={openCreate}
                  setOpen={setOpenCreate}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
