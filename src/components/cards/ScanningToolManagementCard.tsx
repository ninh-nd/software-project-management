import { Code } from "@mui/icons-material";
import { Card, CardContent, CardHeader, SxProps, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useGetScanners } from "~/hooks/fetching/scanner/query";
import EditScannerDialog from "../dialogs/EditScannerDialog";

export default function ScanningToolManagementCard({ sx }: { sx?: SxProps }) {
  function handleViewCode(id: GridRowId) {
    return async () => {
      setId(id as string);
      setOpen(true);
    };
  }
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created by",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      cellClassName: "actions",
      renderCell: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="View code">
                <Code />
              </Tooltip>
            }
            label="View code"
            className="textPrimary"
            onClick={handleViewCode(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const scanningToolsQuery = useGetScanners();
  const scanners = scanningToolsQuery.data?.data ?? [];
  return (
    <Card sx={sx}>
      <CardHeader title="Scanning tool" />
      <CardContent>
        <DataGrid
          columns={columns}
          rows={scanners}
          getRowId={(row) => row._id}
        />
      </CardContent>
      <EditScannerDialog open={open} setOpen={setOpen} scannerId={id} />
    </Card>
  );
}
