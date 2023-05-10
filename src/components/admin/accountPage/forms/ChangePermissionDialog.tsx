import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useAccountByIdQuery,
  usePermissionListQuery,
  useUpdatePermissionMutation,
} from "~/hooks/query";
interface DialogProps {
  id: GridRowId;
  open: boolean;
  handleClose: () => void;
}
type PermissionList = { [key: string]: boolean };
export default function ChangePermissionDialog({
  id,
  open,
  handleClose,
}: DialogProps) {
  useEffect(() => {
    reset();
  }, [id]);
  const updatePermissionMutation = useUpdatePermissionMutation();
  function onSubmit(data: PermissionList) {
    // Create a new array with all the keys that are true
    const newPermissions = Object.keys(data).filter((key) => data[key]);
    updatePermissionMutation.mutate({
      id: id as string,
      permission: newPermissions,
    });
    handleClose();
  }
  // Stop TS from complaining about id not being a string
  if (typeof id !== "string") return null;
  const accountQuery = useAccountByIdQuery(id);
  const account = accountQuery.data?.data;
  const { handleSubmit, control, reset } = useForm<PermissionList>();
  const permissionListQuery = usePermissionListQuery();
  const permissionList = permissionListQuery.data?.data;
  if (!account || !permissionList) return <></>;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Permission</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexWrap="wrap">
            {permissionList.map((permission) => {
              return (
                <FormControl key={permission}>
                  <FormControlLabel
                    labelPlacement="end"
                    control={
                      <Controller
                        name={permission}
                        control={control}
                        defaultValue={account.permission.includes(permission)}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            defaultChecked={account.permission.includes(
                              permission
                            )}
                            disabled={account.role === "admin"}
                          />
                        )}
                      />
                    }
                    label={permission}
                  />
                </FormControl>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" disabled={account.role === "admin"}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
