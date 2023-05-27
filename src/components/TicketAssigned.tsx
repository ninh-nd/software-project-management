import { Close, Undo } from "@mui/icons-material";
import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
import { Ticket } from "~/interfaces/Entity";
const numberOfTaskPerPage = 5;
export default function TicketAssigned({ tickets }: { tickets: Ticket[] }) {
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
    <InfoPaper>
      <Title>Ticket Assigned</Title>
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
                <Link component={RouterLink} to={`/tickets/${ticket._id}`}>
                  ticket.title
                </Link>
              }
              secondary={ticket.description}
            />
          </ListItem>
        ))}
      </List>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", visibility }}
        count={Math.ceil(tickets.length / numberOfTaskPerPage)}
        onChange={handlePageChange}
      />
    </InfoPaper>
  );
}
