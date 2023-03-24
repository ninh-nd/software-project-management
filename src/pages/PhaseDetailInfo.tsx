import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import ArtifactDetails from "~/components/phaseInfo/details/ArtifactDetails";
import PhaseDetails from "~/components/phaseInfo/details/PhaseDetails";
import { usePhaseQuery } from "~/hooks/query";

export default function PhaseDetailInfo() {
  const { phaseId } = useParams();
  if (!phaseId) {
    return <></>;
  }
  const getPhaseQuery = usePhaseQuery(phaseId);
  const phase = getPhaseQuery.data?.data;
  if (!phase) return <></>;
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
