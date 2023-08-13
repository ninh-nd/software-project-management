import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  SxProps,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useThreatsQuery } from "~/hooks/fetching/threat/query";
import AddThreatDialog from "../dialogs/AddThreatDialog";
import { useState } from "react";
import { BugReport } from "@mui/icons-material";

export default function ThreatDictionaryCard({ sx }: { sx?: SxProps }) {
  const [openAddThreatDialog, setOpenAddThreatDialog] = useState(false);
  const threatsQuery = useThreatsQuery();
  const threats = threatsQuery.data?.data ?? [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 400 },
    { field: "description", headerName: "Description", minWidth: 400, flex: 1 },
    {
      field: "score",
      headerName: "Total score (D-R-E-A-D)",
      valueGetter: ({
        row: {
          score: { total, details },
        },
      }) =>
        `${total} (${details.damage} - ${details.reproducibility} - ${details.exploitability} - ${details.affectedUsers} - ${details.discoverability})`,
      width: 200,
    },
  ];
  return (
    <Card sx={sx}>
      <CardHeader title="Threat Dictionary" />
      <CardContent>
        <DataGrid
          rows={threats}
          columns={columns}
          autoHeight
          getRowId={(row) => row._id}
        />
      </CardContent>
      <CardActions>
        <Button
          color="warning"
          startIcon={<BugReport />}
          onClick={() => setOpenAddThreatDialog(true)}
        >
          Add a new threat
        </Button>
      </CardActions>
      <AddThreatDialog
        open={openAddThreatDialog}
        setOpen={setOpenAddThreatDialog}
      />
    </Card>
  );
}
