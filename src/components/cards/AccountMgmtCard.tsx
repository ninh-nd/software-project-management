import { Delete, ManageAccounts } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import EditAccountDialog from "~/components/dialogs/EditAccountDialog";
import RoleChip from "~/components/styled-components/RoleChip";
import {
  useAccountsQuery,
  useDeleteAccountMutation,
} from "~/hooks/fetching/account/query";
import ConfirmDeleteDialog from "../dialogs/ConfirmDeleteDialog";
export default function AccountMgmtCard() {
  const deleteAccountMutation = useDeleteAccountMutation();
  const [openEdit, setOpen] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [id, setId] = useState<GridRowId>("");
  const accountsQuery = useAccountsQuery();
  const accounts = accountsQuery.data?.data ?? [];
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
  function handleDelete() {
    deleteAccountMutation.mutate(id as string);
    setOpenConfirmDelete(false);
  }
  const columns: GridColDef[] = [
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
      renderCell: (params) => <RoleChip role={params.value} />,
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
              <Tooltip title="Update account">
                <ManageAccounts />
              </Tooltip>
            }
            label="Update account"
            className="textPrimary"
            onClick={handleEditClick(id)}
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
  return (
    <Card>
      <CardHeader title="Account" />
      <CardContent>
        <DataGrid
          columns={columns}
          rows={accounts}
          getRowId={(row) => row._id}
          autoHeight
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
        />
      </CardContent>
      <EditAccountDialog id={id} open={openEdit} setOpen={setOpen} />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        text="Are you sure you want to delete this account"
        deleteFunction={handleDelete}
      />
    </Card>
  );
}
