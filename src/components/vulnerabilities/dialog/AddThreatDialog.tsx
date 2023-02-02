import { Box, Dialog, Stack, TextField, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenSnackbar: (value: boolean) => void;
}
interface Form {
  name: string;
  description: string;
}
export default function AddThreatDialog({
  open,
  setOpen,
  setOpenSnackbar,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const submit = (data: Form) => {};
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 2, height: "20vh", width: "20vw" }}>
        <Stack component="form" onSubmit={handleSubmit(submit)} spacing={2}>
          <TextField
            margin="normal"
            autoFocus
            label="Name"
            variant="standard"
            {...register("name", {
              required: "Name is required",
            })}
            error={errors.name !== undefined}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            multiline
            rows={3}
            label="Description"
            variant="standard"
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description !== undefined}
            helperText={errors.description?.message}
          />
          <Button type="submit" fullWidth variant="contained">
            Create new threat
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
