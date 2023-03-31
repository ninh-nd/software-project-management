import { GitHub, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  IconButton,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import FormItem from "~/components/common/FormItem";
import FormWrapper from "~/components/common/FormWrapper";
import { useAccountInfoQuery } from "~/hooks/query";
import { IThirdParty } from "~/interfaces/ThirdParty";
const accountPageStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: 1,
  height: "60vh",
  justifyContent: "space-evenly",
};
function Github({ data: github }: { data: IThirdParty | undefined }) {
  const [isTokenShown, setIsTokenShown] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ accessToken: string }>();
  function updateGithubConfig() {
    setOpen(true);
    if (!github) return;
  }
  function onSubmit(data: { accessToken: string }) {
    // Update access token
    setOpen(false);
  }
  if (!github) {
    return <Button>Connect to Github</Button>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Button disabled>Connected to Github</Button>
      <Button onClick={updateGithubConfig}>Update Github config</Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <FormWrapper
          title="Update Github config"
          closeDialogFunction={() => setOpen(false)}
        >
          <Box component="form" sx={{ p: 4 }} onSubmit={handleSubmit(onSubmit)}>
            <FormItem label="Access token">
              <TextField
                type={isTokenShown ? "text" : "password"}
                defaultValue={github.accessToken}
                {...register("accessToken", {
                  required: "Access token is required",
                })}
                error={errors.accessToken !== undefined}
                helperText={errors.accessToken?.message}
                fullWidth
              />
              <IconButton onClick={() => setIsTokenShown(!isTokenShown)}>
                {isTokenShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </FormItem>
            <FormItem label="URL">
              <TextField fullWidth />
            </FormItem>
            <Button fullWidth type="submit">
              Update
            </Button>
          </Box>
        </FormWrapper>
      </Dialog>
    </Box>
  );
}

export default function AccountInfo() {
  const accountInfoQuery = useAccountInfoQuery();
  const accountInfo = accountInfoQuery.data?.data;
  if (!accountInfo) return <></>;
  const github = accountInfo.thirdParty.find(
    (thirdParty: IThirdParty) => thirdParty.name === "Github"
  );
  return (
    <Box sx={accountPageStyle}>
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
              <Github data={github} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
