import { Commit } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
import { PullRequest } from "~/icons/Icons";
import { User } from "~/interfaces/Entity";
const rowsPerPage = 5;
export default function ActivityHistoryCard({ member }: { member: User }) {
  const [page, setPage] = useState(0);
  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const list = member.activityHistory.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  return (
    <InfoPaper>
      <Title>Activity history</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Activity</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((a, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {a.action === "pr" ? <PullRequest /> : <Commit />}
              </TableCell>
              <TableCell>{a.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={member.activityHistory.length}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </InfoPaper>
  );
}
