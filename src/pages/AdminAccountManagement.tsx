import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
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
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useAccountByIdQuery,
  useAccountUpdateMutation,
  useAccountsQuery,
  useDeleteAccountMutation,
} from "~/hooks/query";
import { IAccountUpdate } from "~/interfaces/Entity";
function renderChip(role: "admin" | "manager" | "member") {
  switch (role) {
    case "admin":
      return <Chip label="Admin" color="primary" />;
    case "manager":
      return <Chip label="Manager" color="secondary" />;
    case "member":
      return <Chip label="Member" color="success" />;
  }
}
interface DialogProps {
  id: GridRowId;
  open: boolean;
  handleClose: () => void;
}
function EditAccountDialog({ id, open, handleClose }: DialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAccountUpdate>();
  const accountUpdateMutation = useAccountUpdateMutation();
  function onSubmit(data: IAccountUpdate) {
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
function ConfirmDeleteDialog({ id, open, handleClose }: DialogProps) {
  const deleteAccountMutation = useDeleteAccountMutation();
  function onDelete() {
    deleteAccountMutation.mutate(id as string);
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
export default function AdminAccountManagement() {
  const [open, setOpen] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [id, setId] = useState<GridRowId>("");
  function handleCloseEditDialog() {
    setOpen(false);
  }
  function handleCloseConfirmDeleteDialog() {
    setOpenConfirmDelete(false);
  }
  function handleEditClick(id: GridRowId) {
    return async () => {
      setId(id);
      setOpen(true);
    };
  }
  function handleDeleteClick(id: GridRowId) {
    return async () => {
      setId(id);
      setOpenConfirmDelete(true);
    };
  }
  const columns: GridColumns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "center",
    },
    { field: "email", headerName: "Email", flex: 1, headerAlign: "center" },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      renderCell: (params) => renderChip(params.value),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      cellClassName: "actions",
      renderCell: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const accountsQuery = useAccountsQuery();
  const accounts = accountsQuery.data?.data ?? [];
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Container maxWidth="lg">
        <DataGrid
          columns={columns}
          rows={accounts}
          getRowId={(row) => row._id}
          autoHeight
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
        />
      </Container>
      <EditAccountDialog
        id={id}
        open={open}
        handleClose={handleCloseEditDialog}
      />
      <ConfirmDeleteDialog
        id={id}
        open={openConfirmDelete}
        handleClose={handleCloseConfirmDeleteDialog}
      />
    </Box>
  );
}
