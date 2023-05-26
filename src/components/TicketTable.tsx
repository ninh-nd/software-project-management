import {
  Box,
  Card,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Ticket } from "~/interfaces/Entity";
import PriorityChip from "./PriorityChip";
import TicketStatusChip from "./TicketStatusChip";
interface TabProps {
  tickets: Ticket[];
}
function renderDate(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}
export default function TicketTable({ tickets }: TabProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const ticketSlice = tickets.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Assigned to</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketSlice.map((ticket) => (
              <TableRow key={ticket._id} hover>
                <TableCell>
                  <Link
                    underline="none"
                    component={RouterLink}
                    to={`${ticket._id}`}
                  >
                    {ticket.title}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <PriorityChip priority={ticket.priority} />
                </TableCell>
                <TableCell align="center">
                  <TicketStatusChip status={ticket.status} />
                </TableCell>
                <TableCell>{ticket.assignee.name}</TableCell>
                <TableCell>{renderDate(ticket.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          count={tickets.length}
        />
      </Box>
    </Card>
  );
}
