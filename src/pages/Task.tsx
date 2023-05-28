import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import OverdueTaskCard from "~/components/OverdueTaskCard";
import TaskProgressCard from "~/components/TaskProgressCard";
import ExtendedTaskTable from "~/components/TaskTableCard";
import { useMemberByAccountIdQuery } from "~/hooks/query";
import { Task } from "~/interfaces/Entity";

function getProgressTotal(tasks: Task[]) {
  const total = tasks.length;
  if (total === 0) return 100;
  const completed = tasks.filter((task) => task.status === "completed").length;
  return (completed / total) * 100;
}

export default function Task() {
  const memberInfoQuery = useMemberByAccountIdQuery();
  const memberInfo = memberInfoQuery.data?.data;
  if (!memberInfo) return <></>;
  return (
    <Box
      flexGrow={1}
      sx={{
        m: {
          xs: 2,
          sm: 4,
        },
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">Tasks</Typography>
            <Button variant="contained">Create a task</Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <OverdueTaskCard total={3} sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={4}>
              <TaskProgressCard
                value={getProgressTotal(memberInfo.taskAssigned)}
              />
            </Grid>
            <Grid item xs={12}>
              <ExtendedTaskTable tasks={memberInfo.taskAssigned} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
