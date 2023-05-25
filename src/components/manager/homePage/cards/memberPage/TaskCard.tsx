import { Add, ArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  CardActions,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { useAssignTaskMutation, useAvailableTasksQuery } from "~/hooks/query";
import { User } from "~/interfaces/Entity";

const rowsPerPage = 5;
export default function TaskCard({ member }: { member: User }) {
  const [page, setPage] = useState(0);
  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const list = member.taskAssigned.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const taskQuery = useAvailableTasksQuery(currentProject);
  const assignTaskList = taskQuery.data?.data ?? [];

  const assignTaskMutation = useAssignTaskMutation();

  async function handleAssignTask(id: string) {
    assignTaskMutation.mutate({ taskId: id, memberId: member._id });
  }

  return (
    <InfoPaper>
      <Title>Tasks</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((t, index) => (
            <TableRow key={index}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.status}</TableCell>
              <TableCell>{t.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={member.taskAssigned.length}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button color="inherit" endIcon={<Add />} size="small" variant="text">
          Assign
        </Button>
      </CardActions>
    </InfoPaper>
  );
}
