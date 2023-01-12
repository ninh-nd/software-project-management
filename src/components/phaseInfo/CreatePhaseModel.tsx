import { Box, Paper, Typography, Button, Dialog } from "@mui/material";
import React from "react";
import CreatePhaseModelForm from "./CreatePhaseModelForm";
const CreatePhaseModel = () => {
  const [open, setOpen] = React.useState(false);
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
        <CreatePhaseModelForm setOpen={setOpen} />
      </Dialog>
    </Box>
  );
};
export default CreatePhaseModel;
