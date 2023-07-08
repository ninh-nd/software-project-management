import { Box, Container, Grid, Toolbar } from "@mui/material";
import AccountMgmtCard from "~/components/cards/AccountMgmtCard";

export default function AdminAccountPage() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Toolbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccountMgmtCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
