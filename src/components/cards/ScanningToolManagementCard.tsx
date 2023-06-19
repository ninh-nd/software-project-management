import { Code } from "@mui/icons-material";
import { Card, CardContent, CardHeader, SxProps, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { useGetScanners } from "~/hooks/fetching/scanner/query";

export default function ScanningToolManagementCard({ sx }: { sx?: SxProps }) {
  function handleViewCode(id: GridRowId) {
    return () => {};
  }
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "config.installCommand",
      headerName: "Install command",
      flex: 3,
      valueGetter: ({ row }) => row.config?.installCommand ?? "",
    },
    {
      field: "createdBy",
      headerName: "Created by",
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
  const scanningToolsQuery = useGetScanners();
  const scanners = scanningToolsQuery.data?.data ?? [];
  return (
    <Card sx={sx}>
      <CardHeader title="Scanning tool management" />
      <CardContent>
        <DataGrid
          columns={columns}
          rows={scanners}
          getRowId={(row) => row.name}
        />
      </CardContent>
    </Card>
  );
}
