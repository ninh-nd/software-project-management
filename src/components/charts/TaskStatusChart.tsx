import {
  Card,
  CardContent,
  CardHeader,
  SxProps,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useTasksQuery } from "~/hooks/fetching/task/query";

export default function TaskStatusChart({ sx }: { sx?: SxProps }) {
  const theme = useTheme();
  const { currentProject } = useParams();
  const tasksQuery = useTasksQuery(currentProject);
  const tasks = tasksQuery.data?.data ?? [];
  const activeTasksCount = tasks.filter(
    (task) => task.status === "active"
  ).length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  return (
    <Card sx={sx}>
      <CardHeader title="Tasks" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={[
                {
                  name: "Active",
                  value: activeTasksCount,
                  fill: theme.palette.secondary.main,
                },
                {
                  name: "Completed",
                  value: completedTasksCount,
                  fill: theme.palette.success.main,
                },
              ]}
              innerRadius={80}
              outerRadius={100}
              label
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
