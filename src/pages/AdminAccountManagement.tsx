import { Delete, Edit, ManageAccounts } from "@mui/icons-material";
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
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import ChangePermissionDialog from "~/components/admin/ChangePermissionDialog";
import EditAccountDialog from "~/components/admin/EditAccountDialog";
import { useAccountsQuery, useDeleteAccountMutation } from "~/hooks/query";
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
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
export default function AdminAccountManagement() {
  const [open, setOpen] = useState(false);
  const [openPermissionEdit, setOpenPermissionEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [id, setId] = useState<GridRowId>("");
  function handleCloseEditDialog() {
    setOpen(false);
  }
  function handleCloseConfirmDeleteDialog() {
    setOpenConfirmDelete(false);
  }
  function handleClosePermissionEditDialog() {
    setOpenPermissionEdit(false);
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
  function handleChangePermissionClick(id: GridRowId) {
    return async () => {
      setId(id);
      setOpenPermissionEdit(true);
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
            icon={
              <Tooltip title="Edit">
                <Edit />
              </Tooltip>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Change permission">
                <ManageAccounts />
              </Tooltip>
            }
            label="Change permision"
            className="textPrimary"
            onClick={handleChangePermissionClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <Delete />
              </Tooltip>
            }
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
      <ChangePermissionDialog
        id={id}
        open={openPermissionEdit}
        handleClose={handleClosePermissionEditDialog}
      />
    </Box>
  );
}
