import { Box, Button, Dialog, Grid, Tooltip } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import TicketTab from "~/components/common/cards/TicketTab";
import AddTicketForm from "~/components/common/forms/AddTicketForm";
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
  const openTickets = tickets.filter((ticket) => ticket.status === "open");
  const closeTickets = tickets.filter((ticket) => ticket.status === "closed");
  return (
    <Box
      flexGrow={1}
      sx={{
        m: {
          xs: 2,
          sm: 4,
        },
      }}
    >
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={6} md={5} lg={3}>
          {createTicketPermission ? (
            <Button variant="contained" onClick={() => setOpen(true)}>
              Add Ticket
            </Button>
          ) : (
            <Tooltip title="You don't have permission to create a ticket">
              <span>
                <Button variant="contained" disabled>
                  Add Ticket
                </Button>
              </span>
            </Tooltip>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={3} />
      </Grid>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <TicketTab title="Open" tickets={openTickets} />
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <TicketTab title="Closed" tickets={closeTickets} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AddTicketForm setCloseDialog={() => setOpen(false)} />
      </Dialog>
    </Box>
  );
}
