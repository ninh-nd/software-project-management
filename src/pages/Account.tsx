import {
  Box,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountProfile from "~/components/AccountProfileCard";
import AccountProfileDetails from "~/components/AccountProfileDetailsCard";
import Integration from "~/components/IntegrationCard";
import { useAccountContext } from "~/hooks/general";

export default function Account() {
  const account = useAccountContext();
  const github = account.thirdParty.find((t) => t.name === "Github");
  const gitlab = account.thirdParty.find((t) => t.name === "Gitlab");
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Stack spacing={5}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3} alignItems="center">
              <Grid xs={12} md={6} lg={4}>
                <AccountProfile account={account} />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <Stack spacing={2} sx={{ p: 2 }}>
                  <AccountProfileDetails />
                  <Integration github={github} gitlab={gitlab} />
                </Stack>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
