import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ArtifactDetails from "~/components/cards/ArtifactDetailsCard";
import ThreatDictionaryCard from "~/components/cards/ThreatDictionaryCard";
import { usePhaseQuery } from "~/hooks/fetching/phase/query";
export default function PhaseDetail() {
  const { phaseId } = useParams();
  if (!phaseId) {
    return <></>;
  }
  const getPhaseQuery = usePhaseQuery(phaseId);
  const phase = getPhaseQuery.data?.data;
  if (!phase) return <></>;
  return (
    <Box flexGrow={1} height="100vh">
      <Toolbar />
      <Container sx={{ my: 4 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{phase.name}</Typography>
            <Typography variant="subtitle1">{phase.description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ArtifactDetails phase={phase} />
          </Grid>
          <Grid item xs={12}>
            <ThreatDictionaryCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
