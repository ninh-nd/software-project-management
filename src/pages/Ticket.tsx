import {
  Badge,
  Box,
  Button,
  Dialog,
  Grid,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { usePermissionHook } from "~/hooks/general";
import { useTicketsQuery } from "~/hooks/query";
import { Ticket } from "~/interfaces/Entity";
import * as dayjs from "dayjs";
interface TabProps {
  title: string;
  ticketList: Ticket[];
}
function renderDate(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
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
            <Link underline="hover" component={RouterLink} to={`${ticket._id}`}>
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
          <Tab title="Open" ticketList={openTickets} />
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <Tab title="Closed" ticketList={closeTickets} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        {/* <AddTicketForm setCloseDialog={() => setOpen(false)} /> */}
      </Dialog>
    </Box>
  );
}
