import { Box, Button, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import CreatePhaseTemplateForm from "./CreatePhaseModelDialog";
export default function CreatePhaseTemplate() {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", flexGrow: "1" }}
    >
      <Box sx={{ p: "30px", display: "flex" }}>
        <Typography variant="h4">
          You haven't created a phase template yet. Do it now?
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: "20px" }}
          onClick={() => setOpen(true)}
        >
          Create a phase template
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <CreatePhaseTemplateForm setOpen={setOpen} />
      </Dialog>
    </Box>
  );
}
