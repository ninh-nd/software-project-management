import { GitHub, Tune, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  bindMenu,
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccountContext } from "~/hooks/general";
import { useUpdateAccessTokenMutation } from "~/hooks/fetching/account/query";
import { GitLab } from "~/icons/Icons";
import { ThirdParty } from "~/hooks/fetching/account";
function UpdateAccessTokenDialog({
  github,
  setOpen,
}: {
  github: ThirdParty | undefined;
  setOpen: (open: boolean) => void;
}) {
  const account = useAccountContext();
  const updateAccessTokenMutation = useUpdateAccessTokenMutation();
  const [isTokenShown, setIsTokenShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ accessToken: string }>();
  async function onSubmit(data: { accessToken: string }) {
    updateAccessTokenMutation.mutate({
      id: account._id,
      accessToken: data.accessToken,
    });
    setOpen(false);
  }
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Update Github configuration</DialogTitle>
      <DialogContent>
        <TextField
          type={isTokenShown ? "text" : "password"}
          defaultValue={github?.accessToken}
          {...register("accessToken", {
            required: "Access token is required",
          })}
          error={errors.accessToken !== undefined}
          helperText={errors.accessToken?.message}
          fullWidth
          label="Access token"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsTokenShown(!isTokenShown)}>
                  {isTokenShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Box>
  );
}
export default function Integration({
  github,
  gitlab,
}: {
  github: ThirdParty | undefined;
  gitlab: ThirdParty | undefined;
}) {
  const [openUpdateAccessToken, setOpenUpdateAccessToken] = useState(false);
  const theme = useTheme();
  const popupStateGithub = usePopupState({
    variant: "popover",
    popupId: "github",
  });
  const popupStateGitlab = usePopupState({
    variant: "popover",
    popupId: "gitlab",
  });
  return (
    <>
      <Card>
        <CardHeader title="Integration" />
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <GitHub />
              </ListItemIcon>
              <ListItemText primary="Github" />
              <ListItemSecondaryAction>
                <IconButton edge="end" {...bindTrigger(popupStateGithub)}>
                  <Tune />
                </IconButton>
                <Popover
                  {...bindPopover(popupStateGithub)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <Menu {...bindMenu(popupStateGithub)}>
                    {github ? (
                      <>
                        <MenuItem>
                          <Typography sx={{ color: theme.palette.error.main }}>
                            Disconnect from Github
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => setOpenUpdateAccessToken(true)}
                        >
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          <Typography>Connect to Github</Typography>
                        </MenuItem>
                        <MenuItem disabled>
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </Popover>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GitLab />
              </ListItemIcon>
              <ListItemText primary="Gitlab" />
              <ListItemSecondaryAction>
                <IconButton edge="end" {...bindTrigger(popupStateGitlab)}>
                  <Tune />
                </IconButton>
                <Popover
                  {...bindPopover(popupStateGitlab)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <Menu {...bindMenu(popupStateGitlab)}>
                    {gitlab ? (
                      <>
                        <MenuItem>
                          <Typography sx={{ color: theme.palette.error.main }}>
                            Disconnect from Gitlab
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => setOpenUpdateAccessToken(true)}
                        >
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          <Typography>Connect to Gitlab</Typography>
                        </MenuItem>
                        <MenuItem disabled>
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </Popover>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Dialog open={openUpdateAccessToken} fullWidth>
        <UpdateAccessTokenDialog
          setOpen={setOpenUpdateAccessToken}
          github={github}
        />
      </Dialog>
    </>
  );
}
