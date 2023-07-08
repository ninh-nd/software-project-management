import { Box, Container, Grid, Toolbar } from "@mui/material";
import ScanningToolManagementCard from "~/components/cards/ScanningToolManagementCard";

export default function AdminToolPage() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Toolbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ScanningToolManagementCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
