import { Box, Dialog, Stack, TextField, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { createThreat } from "~/actions/threatActions";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
interface Form {
  name: string;
  description: string;
}
export default function AddThreatDialog({ open, setOpen }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const submit = async (data: Form) => {
    const response = await createThreat(data);
    if (response.status === "success") {
      queryClient.invalidateQueries(["threat"]);
      setOpen(false);
      enqueueSnackbar("Threat created", { variant: "success" });
    } else {
      setOpen(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
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
