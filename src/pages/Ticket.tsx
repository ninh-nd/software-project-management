import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import TicketTable from "~/components/TicketTable";
import AddTicketForm from "~/components/AddTicketForm";
import { usePermissionHook } from "~/hooks/general";
import { useTicketsQuery } from "~/hooks/query";

export default function Ticket() {
  const permission = usePermissionHook();
  const createTicketPermission = permission.includes("ticket:create");
  const [open, setOpen] = React.useState(false);
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const ticketQuery = useTicketsQuery(currentProject);
  const tickets = ticketQuery.data?.data ?? [];
  return (
    <Box
      flexGrow={1}
      sx={{
        m: {
          xs: 2,
          sm: 4,
        },
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4">Tickets</Typography>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <Add />
                  </SvgIcon>
                }
                variant="contained"
                disabled={!createTicketPermission}
                onClick={() => setOpen(true)}
              >
                Add ticket
              </Button>
            </div>
          </Stack>
          <Card sx={{ p: 2 }}>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Search ticket"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <Search />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{ maxWidth: 500 }}
            />
          </Card>
          <Box width="100%">
            <TicketTable tickets={tickets} />
          </Box>
        </Stack>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AddTicketForm setCloseDialog={() => setOpen(false)} />
      </Dialog>
    </Box>
  );
}
