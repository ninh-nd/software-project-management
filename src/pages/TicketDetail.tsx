import {
  AccountCircle,
  BugReport,
  CheckCircleOutline,
  CheckCircleOutlined,
  ModeStandbyOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Toolbar,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useParams } from "react-router-dom";
import PriorityChip from "~/components/PriorityChip";
import TicketStatusChip from "~/components/TicketStatusChip";
import { useMarkTicketMutation, useTicketQuery } from "~/hooks/query";
import { Ticket } from "~/interfaces/Entity";
function Headline({ ticket }: { ticket: Ticket }) {
  const relativeTime = dayjs().to(dayjs(ticket.updatedAt));
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {ticket.title}
      </Typography>
      <TicketStatusChip status={ticket.status} />
      <Typography variant="body2" display="inline" sx={{ ml: 1 }}>
        {`This ticket was ${ticket.status} at ${relativeTime}`}
      </Typography>
    </Box>
  );
}

function RightColumn({ ticket }: { ticket: Ticket }) {
  return (
    <Stack spacing={1}>
      <Box>
        <Typography variant="h6">Assigner</Typography>
        <AccountCircle sx={{ fontSize: 16, mr: 1 }} />
        <Typography variant="body1" display="inline">
          {ticket.assigner.name}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box>
        <Typography variant="h6">Assignee</Typography>
        <Box>
          <AccountCircle sx={{ fontSize: 16, mr: 1 }} />
          <Typography variant="body1" display="inline">
            {ticket.assignee.name}
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box>
        <Typography variant="h6">Priority</Typography>
        <Typography variant="body1">
          <PriorityChip priority={ticket.priority} />
        </Typography>
      </Box>
    </Stack>
  );
}

function MainContent({ ticket }: { ticket: Ticket }) {
  return (
    <Stack spacing={5}>
      <Box>
        <Typography variant="h5">
          <b>Description</b>
        </Typography>
        <Typography variant="body1">{ticket.description}</Typography>
      </Box>
      <Box>
        <Typography variant="h5">
          <b>Vulnerabilities</b>
        </Typography>
        {ticket.targetedVulnerability.map((v) => (
          <Card sx={{ m: 2 }}>
            <CardHeader
              title={
                <Box display="flex" alignItems="center">
                  <BugReport />
                  <Typography display="inline" variant="h5" sx={{ ml: 1 }}>
                    {v.cveId}
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Typography variant="body1">
                <b>Description: </b>
                {v.description}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="body1">
                <b>Severity: </b>
                {v.severity}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="body1">
                <b>Score: </b>
                {v.score}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="body1">
                <b>CWEs: </b>
                {v.cwes.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
}

export default function TicketDetail() {
  const { ticketId } = useParams();
  const ticketMutation = useMarkTicketMutation();
  function closeTicket() {
    if (ticketId) {
      ticketMutation.mutate({ id: ticketId, status: "closed" });
    }
  }
  function reopenTicket() {
    if (ticketId) {
      ticketMutation.mutate({ id: ticketId, status: "open" });
    }
  }
  if (!ticketId) return <></>;
  const ticketQuery = useTicketQuery(ticketId);
  const ticket = ticketQuery.data?.data;
  if (!ticket) return <></>;
  return (
    <Box flexGrow={1} height="100vh">
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Stack spacing={2} sx={{ m: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            alignItems="flex-end"
          >
            <Headline ticket={ticket} />
            {ticket.status === "open" ? (
              <Button
                variant="contained"
                startIcon={<CheckCircleOutline />}
                onClick={closeTicket}
              >
                Close ticket
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<RefreshOutlined />}
                onClick={reopenTicket}
              >
                Reopen ticket
              </Button>
            )}
          </Stack>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <MainContent ticket={ticket} />
            </Grid>
            <Grid item xs={3}>
              <RightColumn ticket={ticket} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
