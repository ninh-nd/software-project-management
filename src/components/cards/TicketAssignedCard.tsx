import { Close, Undo } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Ticket } from "~/hooks/fetching/ticket";
const numberOfTaskPerPage = 5;
export default function TicketAssigned({
  tickets,
  sx,
}: {
  tickets: Ticket[];
  sx?: SxProps;
}) {
  const { currentProject } = useParams();
  const encodedUrl = encodeURIComponent(currentProject);
  const [currentPage, setCurrentPage] = useState(0);
  const visibility = tickets.length > 0 ? "visible" : "hidden";
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value - 1);
  }
  const currentPageList = tickets.slice(
    currentPage,
    currentPage + numberOfTaskPerPage
  );
  return (
    <Card sx={sx}>
      <CardHeader title="Ticket Assigned" />
      <CardContent>
        {tickets.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              There's nothing here...
            </Typography>
          </Box>
        ) : (
          <List>
            {currentPageList.map((ticket) => (
              <ListItem
                key={ticket._id}
                secondaryAction={
                  <Tooltip
                    title={
                      ticket.status === "open"
                        ? "Close this ticket"
                        : "Reopen ticket"
                    }
                  >
                    <IconButton edge="end">
                      {ticket.status === "open" ? <Close /> : <Undo />}
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemIcon>
                  {ticket.priority === "low"
                    ? "🟢"
                    : ticket.priority === "medium"
                    ? "🟠"
                    : "🔴"}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      component={RouterLink}
                      to={`/${encodedUrl}/tickets/${ticket._id}`}
                    >
                      {ticket.title}
                    </Link>
                  }
                  secondary={ticket.description}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Pagination
          sx={{ display: "flex", justifyContent: "center", visibility }}
          count={Math.ceil(tickets.length / numberOfTaskPerPage)}
          onChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}
