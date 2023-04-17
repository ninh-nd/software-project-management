import {
  AccountCircle,
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
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useMarkTicketMutation, useTicketQuery } from "~/hooks/query";
import { ITicket } from "~/interfaces/Entity";

function Headline({ ticket }: { ticket: ITicket }) {
  const createdAt = Intl.DateTimeFormat("en-Us", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(ticket.createdAt));
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {ticket.title}
      </Typography>
      {ticket.status === "open" ? (
        <Chip label="Open" color="success" avatar={<ModeStandbyOutlined />} />
      ) : (
        <Chip
          label="Closed"
          color="secondary"
          avatar={<CheckCircleOutlined />}
        />
      )}
      <Typography variant="body2" display="inline" sx={{ ml: 1 }}>
        {`Ticket was created at ${createdAt}`}
      </Typography>
    </Box>
  );
}

function RightColumn({ ticket }: { ticket: ITicket }) {
  return (
    <Stack spacing={1}>
      <Box>
        <Typography variant="h6">Assigner</Typography>
        <AccountCircle sx={{ fontSize: 16, mr: 1 }} />
        <Typography variant="body1" display="inline">
          {ticket.assigner.name}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">Assignee</Typography>
        {ticket.assignee.map((assignee) => {
          return (
            <Box key={assignee._id}>
              <AccountCircle sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body1" display="inline">
                {assignee.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Typography variant="h6">Priority</Typography>
        <Typography variant="body1">
          {renderPriority(ticket.priority)}
        </Typography>
      </Box>
    </Stack>
  );
}

function MainContent({ ticket }: { ticket: ITicket }) {
  const ticketMutation = useMarkTicketMutation();
  function closeTicket() {
    ticketMutation.mutate({ id: ticket._id, status: "closed" });
  }
  function reopenTicket() {
    ticketMutation.mutate({ id: ticket._id, status: "open" });
  }
  return (
    <Stack spacing={5}>
      <Box>
        <Typography variant="h5">Description</Typography>
        <Typography variant="body1">{ticket.description}</Typography>
      </Box>
      <Box>
        <Typography variant="h5">Targeted vulnerabilities</Typography>
        {ticket.targetedVulnerability.map((v) => {
          return (
            <Chip
              key={v.cveId}
              label={v.cveId}
              sx={{ mt: 2, mr: 2 }}
              size="medium"
            />
          );
        })}
      </Box>
      <Box>
        <Typography variant="h5">Actions</Typography>
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
      </Box>
    </Stack>
  );
}

function renderPriority(priority: string) {
  switch (priority) {
    case "low":
      return <Box color="green">Low</Box>;
    case "medium":
      return <Box color="orange">Medium</Box>;
    case "high":
      return <Box color="red">High</Box>;
    default:
      return <Box color="black">Unknown</Box>;
  }
}

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  if (!ticketId) return <></>;
  const ticketQuery = useTicketQuery(ticketId);
  const ticket = ticketQuery.data?.data;
  if (!ticket) return <></>;
  return (
    <Box flexGrow={1} height="100vh">
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ m: 2 }}>
          <Headline ticket={ticket} />
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
