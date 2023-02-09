import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPhase } from "~/actions/phaseAction";
import ArtifactDetails from "~/components/phaseInfo/details/ArtifactDetails";
import PhaseDetails from "~/components/phaseInfo/PhaseDetails";

export default function PhaseDetailInfo() {
  const { phaseId } = useParams();
  if (phaseId === undefined) {
    return <></>;
  }
  const getPhaseQuery = useQuery(["phase", phaseId], () => getPhase(phaseId));
  const phase = getPhaseQuery.data?.data;
  if (phase === undefined) return <></>;
  return (
    <Box flexGrow={1} height="100vh">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
