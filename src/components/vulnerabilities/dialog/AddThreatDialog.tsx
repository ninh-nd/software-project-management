import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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
      <FormWrapper
        title="Add threat"
        closeDialogFunction={() => setOpen(false)}
      >
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
      </FormWrapper>
    </Dialog>
  );
}
