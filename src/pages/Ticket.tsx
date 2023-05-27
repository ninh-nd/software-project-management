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
  TextField,
  Toolbar,
  Typography,
  debounce,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import AddTicketForm from "~/components/AddTicketForm";
import TicketTable from "~/components/TicketTable";
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
  const [displayTickets, setDisplayTickets] = useState(tickets);
  function handleFilterTicket(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value === "all") {
      setDisplayTickets(tickets);
    } else {
      setDisplayTickets(tickets.filter((t) => t.status === value));
    }
  }
  const searchTicket = debounce((event) => {
    const value = event.target.value;
    if (value === "") {
      setDisplayTickets(tickets);
    } else {
      setDisplayTickets(
        tickets.filter((t) => t.title.toLowerCase().includes(value))
      );
    }
  }, 500);
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
          <Card sx={{ p: 2, display: "flex" }}>
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
              onChange={searchTicket}
              sx={{ maxWidth: 500 }}
            />
            <Stack
              direction="row"
              spacing={1}
              width="100%"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography variant="h6">Filter:</Typography>
              <TextField
                label="Status"
                select
                SelectProps={{ native: true }}
                sx={{ minWidth: 200 }}
                onChange={handleFilterTicket}
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </TextField>
            </Stack>
          </Card>
          <Box width="100%">
            <TicketTable tickets={displayTickets} />
          </Box>
        </Stack>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AddTicketForm setCloseDialog={() => setOpen(false)} />
      </Dialog>
    </Box>
  );
}
