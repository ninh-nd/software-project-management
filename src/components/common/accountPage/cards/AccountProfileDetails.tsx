import { useAccountContext } from "~/hooks/general";
import { useMemberByAccountIdQuery } from "~/hooks/query";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import { useCallback, useState } from "react";
import InfoPaper from "../../styledComponents/InfoPaper";
import Title from "../../styledComponents/Title";
export default function AccountProfileDetails() {
  const userInfoQuery = useMemberByAccountIdQuery();
  const user = userInfoQuery.data?.data;
  if (!user) return <></>;
  function handleSubmit() {
    return;
  }
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <InfoPaper>
        <Title>Profile</Title>
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
        <Divider sx={{ py: 2 }} />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </InfoPaper>
    </form>
  );
}
