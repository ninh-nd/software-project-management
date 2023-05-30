import {
  Assignment,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  SxProps,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import {
  useMemberByAccountIdQuery,
  useUpdateTaskMutation,
} from "~/hooks/query";
import { Task } from "~/interfaces/Entity";

const numberOfTaskPerPage = 5;
export default function TaskAssigned({
  tasks,
  sx,
}: {
  tasks: Task[];
  sx?: SxProps;
}) {
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
    <Card sx={sx}>
      <CardHeader title="Task Assigned" />
      <CardContent>
        <List>
          {currentPageList.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <Tooltip
                  title={
                    task.status === "active" ? "Mark as completed" : "Undo"
                  }
                >
                  <IconButton
                    edge="end"
                    onClick={markTask(
                      task._id,
                      task.status === "active" ? "completed" : "active"
                    )}
                  >
                    {task.status === "active" ? (
                      <CheckBoxOutlineBlank />
                    ) : (
                      <CheckBox />
                    )}
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText
                primary={task.name}
                secondary={task.description}
                sx={{
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none",
                }}
              />
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
      </CardContent>
    </Card>
  );
}
