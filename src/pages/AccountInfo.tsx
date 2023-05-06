import { GitHub, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAccountInfoQuery,
  useUpdateAccessTokenMutation,
} from "~/hooks/query";
import { ThirdParty } from "~/interfaces/Entity";
const accountPageStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: 1,
  height: "60vh",
  justifyContent: "space-evenly",
};
function Github({
  data,
  accountId,
}: {
  data: ThirdParty | undefined;
  accountId: string;
}) {
  const updateAccessTokenMutation = useUpdateAccessTokenMutation();
  const [isTokenShown, setIsTokenShown] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ accessToken: string }>();
  function updateGithubConfig() {
    setOpen(true);
    if (!data) return;
  }
  async function onSubmit(data: { accessToken: string }) {
    updateAccessTokenMutation.mutate({
      id: accountId,
      accessToken: data.accessToken,
    });
    setOpen(false);
  }
  if (!data) {
    return <Button>Connect to Github</Button>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Button disabled>Connected to Github</Button>
      <Button onClick={updateGithubConfig}>Update access token</Button>
      <Dialog open={open} fullWidth>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Update Github configuration</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <TextField
                  type={isTokenShown ? "text" : "password"}
                  defaultValue={data.accessToken}
                  {...register("accessToken", {
                    required: "Access token is required",
                  })}
                  error={errors.accessToken !== undefined}
                  helperText={errors.accessToken?.message}
                  fullWidth
                  label="Access token"
                />
                <IconButton onClick={() => setIsTokenShown(!isTokenShown)}>
                  {isTokenShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default function AccountInfo() {
  const accountInfoQuery = useAccountInfoQuery();
  const accountInfo = accountInfoQuery.data?.data;
  if (!accountInfo) return <></>;
  const github = accountInfo.thirdParty.find(
    (thirdParty: ThirdParty) => thirdParty.name === "Github"
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
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <GitHub />
            <Github data={github} accountId={accountInfo._id} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
