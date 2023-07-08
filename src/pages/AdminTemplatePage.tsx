import { Box, Container, Grid, Toolbar } from "@mui/material";
import PhaseTemplateMgmtCard from "~/components/cards/PhaseTemplateMgmtCard";

export default function AdminTemplatePage() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Toolbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PhaseTemplateMgmtCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
