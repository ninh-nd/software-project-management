import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTaskQuery, useUpdateTaskMutation } from "~/hooks/query";
import { TaskCreate } from "~/interfaces/Entity";

interface UpdateTaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string | undefined;
}
export default function EditTaskDialog({
  open,
  setOpen,
  id,
}: UpdateTaskDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskCreate>();
  useEffect(() => {
    reset();
  }, [id]);
  if (!id) return <></>;
  const getTaskInfoQuery = useTaskQuery(id);
  const updateTaskMutation = useUpdateTaskMutation();
  const task = getTaskInfoQuery.data?.data;
  if (!task) return <></>;
  async function onSubmit(data: TaskCreate) {
    if (!id) return;
    updateTaskMutation.mutate({ data, id });
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update task</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              {...register("name", { required: "Name is required" })}
              defaultValue={task.name}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              defaultValue={task.description}
              label="Description"
              {...register("description", {
                required: "Please give a short description",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Status" defaultValue={task.status}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
