import { Box, Container, Grid, Toolbar } from "@mui/material";
import TotalActiveUsers from "~/components/cards/TotalActiveUsers";
import RoleDistributionChart from "~/components/charts/RoleDistributionChart";
import { useAccountsQuery } from "~/hooks/fetching/account/query";
export default function AdminHomePage() {
  const accountsQuery = useAccountsQuery();
  const accounts = accountsQuery.data?.data ?? [];
  return (
    <Box sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
      <Toolbar />
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TotalActiveUsers total={accounts.length} />
          </Grid>
          <Grid item xs={4}>
            <RoleDistributionChart accounts={accounts} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
