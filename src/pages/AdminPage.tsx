import { Box, Container, Grid } from "@mui/material";
import AccountMgmtCard from "~/components/cards/AccountMgmtCard";
import PhaseTemplateMgmtCard from "~/components/cards/PhaseTemplateMgmtCard";
import ScanningToolManagementCard from "~/components/cards/ScanningToolManagementCard";
export default function AdminPage() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100vw",
        display: "flex",
        justifyContent: " center",
      }}
    >
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccountMgmtCard />
          </Grid>
          <Grid item xs={6}>
            <ScanningToolManagementCard sx={{ minHeight: 400 }} />
          </Grid>
          <Grid item xs={6}>
            <PhaseTemplateMgmtCard sx={{ minHeight: 400 }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
