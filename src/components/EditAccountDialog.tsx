import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { Controller, useForm } from "react-hook-form";
import { useAccountByIdQuery, useAccountUpdateMutation } from "~/hooks/query";
import { AccountUpdate } from "~/interfaces/Entity";
interface DialogProps {
  id: GridRowId;
  open: boolean;
  handleClose: () => void;
}
export default function EditAccountDialog({
  id,
  open,
  handleClose,
}: DialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccountUpdate>();
  const accountUpdateMutation = useAccountUpdateMutation();
  function onSubmit(data: AccountUpdate) {
    accountUpdateMutation.mutate({
      id: id as string,
      updateData: data,
    });
    handleClose();
  }
  // Stop TS from complaining about id not being a string
  if (typeof id !== "string") return null;
  const accountQuery = useAccountByIdQuery(id);
  const account = accountQuery.data?.data;
  if (!account) return <></>;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Account</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            To edit this account, please enter the new information here.
          </DialogContentText>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField label="Username" value={account.username} disabled />
            <TextField
              label="Email"
              defaultValue={account.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => {
                if (account.role === "admin") {
                  return (
                    <Select
                      label="Role"
                      disabled
                      {...field}
                      value={account.role}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  );
                }
                return (
                  <Select {...field} label="Role" defaultValue={account.role}>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="member">Member</MenuItem>
                  </Select>
                );
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
