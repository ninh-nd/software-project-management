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
import { useForm } from "react-hook-form";
import FormWrapper from "~/components/common/FormWrapper";
import { useCreateThreatMutation } from "~/hooks/query";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
interface Form {
  name: string;
  description: string;
}
export default function AddThreatDialog({ open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const createThreatMutation = useCreateThreatMutation();
  async function submit(data: Form) {
    createThreatMutation.mutate(data);
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create a new threat</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
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
          fullWidth
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
