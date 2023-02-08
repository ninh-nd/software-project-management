import {
  Badge,
  Box,
  Button,
  Dialog,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getTickets } from "~/actions/ticketAction";
import FormWrapper from "~/components/common/FormWrapper";
import AddTicketForm from "~/components/ticket/AddTicketForm";
import { ITicket } from "~/interfaces/Ticket";

interface TabProps {
  title: string;
  ticketList: ITicket[];
}
function renderDate(date: string) {
  const dateObj = new Date(date);
  return Intl.DateTimeFormat("en-Us", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateObj);
}
function Tab({ title, ticketList }: TabProps) {
  return (
    <Paper elevation={3} sx={{ height: "73vh" }}>
      <Box>
        <Badge
          badgeContent={ticketList.length}
          color="primary"
          sx={{ m: 2 }}
          max={10}
        >
          <Typography variant="h6" display="inline">
            {title}
          </Typography>
        </Badge>
      </Box>
      <Stack sx={{ p: 2 }} spacing={0.5}>
        {ticketList.map((ticket) => (
          <Paper key={ticket._id} sx={{ height: "8em" }} variant="outlined">
            <Link underline="hover">
              <Typography variant="body1" sx={{ m: 2 }}>
                {ticket.title}
              </Typography>
            </Link>
            <Typography variant="body2" sx={{ m: 2 }}>
              Priority:{" "}
              {ticket.priority === "low" ? (
                <Box color="green" display="inline">
                  Low
                </Box>
              ) : ticket.priority === "medium" ? (
                <Box color="orange" display="inline">
                  Medium
                </Box>
              ) : (
                <Box color="red" display="inline">
                  High
                </Box>
              )}
            </Typography>
            <Typography variant="body2" sx={{ m: 2 }}>
              Created: {renderDate(ticket.createdAt)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}

export default function TicketPage() {
  const [open, setOpen] = React.useState(false);
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const ticketQuery = useQuery(["ticket"], () => getTickets(currentProject));
  const tickets = ticketQuery.data === undefined ? [] : ticketQuery.data.data;
  const openTickets = tickets.filter((ticket) => ticket.status === "open");
  const closeTickets = tickets.filter((ticket) => ticket.status === "closed");
  return (
    <Box flexGrow={1} sx={{ m: 10 }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={3}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Ticket
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={3}>
          <Tab title="Open" ticketList={openTickets} />
        </Grid>
        <Grid item xs={3}>
          <Tab title="Closed" ticketList={closeTickets} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <FormWrapper
          title="Add Ticket"
          closeDialogFunction={() => setOpen(false)}
        >
          <AddTicketForm setCloseDialog={() => setOpen(false)} />
        </FormWrapper>
      </Dialog>
    </Box>
  );
}
