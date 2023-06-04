import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  SxProps,
  TextField,
} from "@mui/material";
import { useUserByAccountIdQuery } from "~/hooks/fetching/user/query";
export default function AccountProfileDetails({ sx }: { sx?: SxProps }) {
  const userInfoQuery = useUserByAccountIdQuery();
  const user = userInfoQuery.data?.data;
  if (!user) return <></>;
  function handleSubmit() {
    return;
  }
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card sx={sx}>
        <CardHeader title="Profile" />
        <CardContent>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  required
                  defaultValue={user.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  disabled
                  defaultValue={user.account.username}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={user.account.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider sx={{ py: 2 }} />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
