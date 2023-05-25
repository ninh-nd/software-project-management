import { Badge, Box, Link, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Ticket } from "~/interfaces/Entity";
import { Link as RouterLink } from "react-router-dom";
interface TabProps {
  title: string;
  tickets: Ticket[];
}
function renderDate(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}
export default function TicketTab({ title, tickets }: TabProps) {
  return (
    <Paper elevation={3} sx={{ height: "100vh" }}>
      <Box>
        <Badge
          badgeContent={tickets.length}
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
        {tickets.map((ticket) => (
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
