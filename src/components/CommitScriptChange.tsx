import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Branch } from "~/icons/Icons";

interface Props {
  fileName: string;
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function CommitScriptChange({
  fileName,
  content,
  open,
  setOpen,
}: Props) {
  const { register, handleSubmit, control, watch } = useForm();
  const watchBranchSelection = watch("branchSelection");
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Commit changes</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField label="Commit message" fullWidth />
          <Controller
            name="branchSelection"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  control={<Radio />}
                  label="Commit directly to default branch (master/main)"
                  value="default"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Create a new branch for this commit"
                  value="new"
                />
              </RadioGroup>
            )}
          />
          {watchBranchSelection === "new" && (
            <TextField
              label="Branch name"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Branch />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit" variant="contained" color="success">
          Commit changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
