import { MoreHoriz } from "@mui/icons-material";
import { Card, CardContent, CardHeader, SxProps, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { usePhaseTemplatesQuery } from "~/hooks/fetching/phase/query";
import PhaseTemplateDetailsDialog from "../dialogs/PhaseTemplateDetailsDialog";
import { useState } from "react";

export default function PhaseTemplateMgmtCard({ sx }: { sx?: SxProps }) {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const phaseTemplateQuery = usePhaseTemplatesQuery();
  const phaseTemplates = phaseTemplateQuery.data?.data ?? [];
  function handleViewDetails(id: GridRowId) {
    setId(id as string);
    setOpen(true);
  }
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "createdBy", headerName: "Created by" },
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
              <Tooltip title="Details">
                <MoreHoriz />
              </Tooltip>
            }
            label="Details"
            className="textPrimary"
            onClick={() => handleViewDetails(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <Card sx={sx}>
      <CardHeader title="Phase template" />
      <CardContent>
        <DataGrid
          rows={phaseTemplates}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </CardContent>
      <PhaseTemplateDetailsDialog
        open={open}
        setOpen={setOpen}
        templateId={id}
      />
    </Card>
  );
}
