import {
  Check,
  CheckCircleOutline,
  HourglassBottom,
  Undo,
} from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
import {
  useMemberByAccountIdQuery,
  useUpdateTaskMutation,
} from "~/hooks/query";
import { Task } from "~/interfaces/Entity";

const numberOfTaskPerPage = 5;
export default function TaskAssigned({ tasks }: { tasks: Task[] }) {
  const userInfoQuery = useMemberByAccountIdQuery();
  const userInfo = userInfoQuery.data?.data;
  const [currentPage, setCurrentPage] = useState(0);
  const updateTaskMutation = useUpdateTaskMutation();
  const visibility = tasks.length > 0 ? "visible" : "hidden";
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value - 1);
  }
  const currentPageList = tasks.slice(
    currentPage,
    currentPage + numberOfTaskPerPage
  );
  function markTask(id: string, status: "active" | "completed") {
    return () => {
      if (!userInfo) return;
      updateTaskMutation.mutate({
        id,
        data: {
          status,
        },
      });
    };
  }
  return (
    <InfoPaper sx={{ height: 400 }}>
      <Title>Task Assigned</Title>
      <List>
        {currentPageList.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <Tooltip
                title={task.status === "active" ? "Mark as completed" : "Undo"}
              >
                <IconButton
                  edge="end"
                  onClick={markTask(
                    task._id,
                    task.status === "active" ? "completed" : "active"
                  )}
                >
                  {task.status === "active" ? <Check /> : <Undo />}
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemIcon>
              {task.status === "active" ? (
                <HourglassBottom />
              ) : (
                <CheckCircleOutline />
              )}
            </ListItemIcon>
            <ListItemText primary={task.name} secondary={task.description} />
          </ListItem>
        ))}
      </List>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          visibility,
        }}
        count={Math.ceil(tasks.length / numberOfTaskPerPage)}
        onChange={handlePageChange}
      />
    </InfoPaper>
  );
}
