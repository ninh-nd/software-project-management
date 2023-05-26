import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateTaskMutation } from "~/hooks/query";
import { TaskCreate } from "~/interfaces/Entity";

interface CreateTaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function CreateTaskDialog({
  open,
  setOpen,
}: CreateTaskDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskCreate>({
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });
  useEffect(() => {
    reset();
  }, [open]);
  const { currentProject } = useParams();
  const createTaskMutation = useCreateTaskMutation();
  async function onSubmit(data: TaskCreate) {
    createTaskMutation.mutate({ data, projectName: currentProject as string });
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create a new task</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Description"
              {...register("description", {
                required: "Please give a short description",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              label="Status"
              {...register("status")}
              disabled
              defaultValue="active"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
