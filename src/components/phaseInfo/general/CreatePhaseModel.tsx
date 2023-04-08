import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FormWrapper from "~/components/common/FormWrapper";
import CreatePhaseModelForm from "./CreatePhaseModelForm";
export default function CreatePhaseModel() {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", flexGrow: "1" }}
    >
      <Box sx={{ p: "30px", display: "flex" }}>
        <Typography variant="h4">
          You haven't created a phase model yet. Do it now?
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: "20px" }}
          onClick={() => setOpen(true)}
        >
          Create a phase model
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <FormWrapper
          title="Create phase model"
          closeDialogFunction={() => setOpen(false)}
        >
          <CreatePhaseModelForm setOpen={setOpen} />
        </FormWrapper>
      </Dialog>
    </Box>
  );
}
