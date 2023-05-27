import { Box, Typography, Grid, Toolbar, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import ActiveTaskCount from "~/components/ActiveTaskCount";
import ArtifactDetails from "~/components/ArtifactDetails";
import CompletedTaskCount from "~/components/CompletedTaskCount";
import PhaseDetails from "~/components/PhaseDetails";
import { usePhaseQuery } from "~/hooks/query";
export default function PhaseDetail() {
  const { phaseId } = useParams();
  if (!phaseId) {
    return <></>;
  }
  const getPhaseQuery = usePhaseQuery(phaseId);
  const phase = getPhaseQuery.data?.data;
  if (!phase) return <></>;
  const activeTaskCount = phase.tasks.filter(
    (task) => task.status === "active"
  ).length;
  const completedTaskCount = phase.tasks.filter(
    (task) => task.status === "completed"
  ).length;
  return (
    <Box flexGrow={1} height="100vh">
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{phase.name}</Typography>
            <Typography variant="subtitle1">{phase.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ActiveTaskCount
              total={phase.tasks.length}
              count={activeTaskCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CompletedTaskCount
              total={phase.tasks.length}
              count={completedTaskCount}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <PhaseDetails phase={phase} />
          </Grid>
          <Grid item xs={12}>
            <ArtifactDetails phase={phase} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
