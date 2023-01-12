import { GitHub } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { getAccountInfo } from "~/actions/accountAction";
import { IThirdParty } from "~/interfaces/ThirdParty";
const renderGithub = (github: IThirdParty | undefined) => {
  const { register, handleSubmit } = useForm<{ accessToken: string }>();
  const updateAccessTokenGithub = () => {
    setOpen(true);
    if (github === undefined) return;
  };
  const onSubmit = (data: { accessToken: string }) => {
    // Update access token
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  if (github === undefined) {
    return <Button>Connect to Github</Button>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Button disabled>Connected to Github</Button>
      <Button onClick={updateAccessTokenGithub}>Update access token</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          sx={{ p: "20px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Github access token"
            defaultValue={github.accessToken}
            fullWidth
            {...register("accessToken")}
          />
          <Button fullWidth type="submit">
            Update
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

const AccountInfo = () => {
  const accountInfoQuery = useQuery(["accountInfo"], () => getAccountInfo());
  const accountInfo =
    accountInfoQuery.data === undefined
      ? { username: "", email: "", thirdParty: [] }
      : accountInfoQuery.data.data;
  const github = accountInfo.thirdParty.find(
    (thirdParty: IThirdParty) => thirdParty.name === "Github"
  );
  return (
    <Box className="accountPage">
      <Card sx={{ minWidth: "550px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              height="140"
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Account: {accountInfo.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {accountInfo.email}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12}>
            <CardActions>
              <Button variant="contained">Change password</Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ minWidth: "550px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Integration
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={2}>
              <GitHub />
            </Grid>
            <Grid item xs={10}>
              {renderGithub(github)}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
export default AccountInfo;
