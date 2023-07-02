import {
  BugReport,
  Edit,
  GitHub,
  Handyman,
  Tune,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
  Divider,
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
import { ThirdParty } from "~/hooks/fetching/account";
import {
  useDisconnectFromGithubMutation,
  useDisconnectFromGitlabMutation,
  useUpdateAccessTokenMutation,
} from "~/hooks/fetching/account/query";
import { GitLab } from "~/icons/Icons";
import AddNewToolDialog from "../dialogs/AddNewToolDialog";
import ConfirmActionDialog from "../dialogs/ConfirmActionDialog";
import ImageScanningConfigDialog from "../dialogs/ImageScanningConfigDialog";
import { useAccountContext } from "~/hooks/general";
import { useGetScanners } from "~/hooks/fetching/scanner/query";
import EditScannerDialog from "../dialogs/EditScannerDialog";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function UpdateAccessTokenDialog({
  github,
  setOpen,
  open,
}: {
  github: ThirdParty | undefined;
  setOpen: (open: boolean) => void;
  open: boolean;
}) {
  const updateAccessTokenMutation = useUpdateAccessTokenMutation();
  const [isTokenShown, setIsTokenShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ accessToken: string }>();
  async function onSubmit(data: { accessToken: string }) {
    updateAccessTokenMutation.mutate(data.accessToken);
    setOpen(false);
  }
  return (
    <Dialog open={open} fullWidth>
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
    </Dialog>
  );
}
export default function Integration() {
  const [selectedScanner, setSelectedScanner] = useState("");
  const account = useAccountContext();
  const scannersQuery = useGetScanners(account.username);
  const scanners = scannersQuery.data?.data ?? [];
  const github = account.thirdParty.find((t) => t.name === "Github");
  const gitlab = account.thirdParty.find((t) => t.name === "Gitlab");
  const [openEditScanner, setOpenEditScanner] = useState(false);
  const [openImageScanningConfig, setOpenImageScanningConfig] = useState(false);
  const [openUpdateAccessToken, setOpenUpdateAccessToken] = useState(false);
  const [openDisconnectFromGithub, setOpenDisconnectFromGithub] =
    useState(false);
  const [openDisconnectFromGitlab, setOpenDisconnectFromGitlab] =
    useState(false);
  const [openAddNew, setOpenAddNew] = useState(false);
  const disconnectFromGithubMutation = useDisconnectFromGithubMutation();
  const disconnectFromGitlabMutation = useDisconnectFromGitlabMutation();
  const theme = useTheme();
  const popupStateGithub = usePopupState({
    variant: "popover",
    popupId: "github",
  });
  const popupStateGitlab = usePopupState({
    variant: "popover",
    popupId: "gitlab",
  });
  const popupStateImageScanning = usePopupState({
    variant: "popover",
    popupId: "image-scanning",
  });
  function connectToGithub() {
    window.open(`${API_BASE_URL}account/connect/github`, "_self");
  }
  function connectToGitlab() {
    window.open(`${API_BASE_URL}account/connect/gitlab`, "_self");
  }
  function disconnectFromGithub() {
    disconnectFromGithubMutation.mutate();
  }
  function disconnectFromGitlab() {
    disconnectFromGitlabMutation.mutate();
  }
  function editScanner(id: string) {
    return () => {
      setSelectedScanner(id);
      setOpenEditScanner(true);
    };
  }
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
                      <Box>
                        <MenuItem>
                          <Typography
                            sx={{ color: theme.palette.error.main }}
                            onClick={() => setOpenDisconnectFromGithub(true)}
                          >
                            Disconnect from Github
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => setOpenUpdateAccessToken(true)}
                        >
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </Box>
                    ) : (
                      <Box>
                        <MenuItem onClick={connectToGithub}>
                          <Typography>Connect to Github</Typography>
                        </MenuItem>
                        <MenuItem disabled>
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </Box>
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
                      <Box>
                        <MenuItem>
                          <Typography
                            sx={{ color: theme.palette.error.main }}
                            onClick={() => setOpenDisconnectFromGitlab(true)}
                          >
                            Disconnect from Gitlab
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => setOpenUpdateAccessToken(true)}
                        >
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </Box>
                    ) : (
                      <Box>
                        <MenuItem onClick={connectToGitlab}>
                          <Typography>Connect to Gitlab</Typography>
                        </MenuItem>
                        <MenuItem disabled>
                          <Typography>Update access token</Typography>
                        </MenuItem>
                      </Box>
                    )}
                  </Menu>
                </Popover>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <BugReport />
              </ListItemIcon>
              <ListItemText primary="Image scanning tool" />
              <ListItemSecondaryAction>
                <IconButton
                  {...bindTrigger(popupStateImageScanning)}
                  edge="end"
                >
                  <Tune />
                </IconButton>
                <Popover
                  {...bindPopover(popupStateImageScanning)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <Menu {...bindMenu(popupStateImageScanning)}>
                    <MenuItem onClick={() => setOpenImageScanningConfig(true)}>
                      Configure
                    </MenuItem>
                    <MenuItem onClick={() => setOpenAddNew(true)}>
                      Add a new tool
                    </MenuItem>
                  </Menu>
                </Popover>
              </ListItemSecondaryAction>
            </ListItem>
            {scanners.map((scanner) => (
              <ListItem key={scanner.name} sx={{ mx: 3 }}>
                <ListItemIcon>
                  <Handyman />
                </ListItemIcon>
                <ListItemText primary={scanner.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={editScanner(scanner._id)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <UpdateAccessTokenDialog
        open={openUpdateAccessToken}
        setOpen={setOpenUpdateAccessToken}
        github={github}
      />
      <ConfirmActionDialog
        open={openDisconnectFromGithub}
        setOpen={setOpenDisconnectFromGithub}
        text="Are you sure you want to disconnect from Github?"
        callback={disconnectFromGithub}
      />
      <ConfirmActionDialog
        open={openDisconnectFromGitlab}
        setOpen={setOpenDisconnectFromGitlab}
        text="Are you sure you want to disconnect from Github?"
        callback={disconnectFromGitlab}
      />
      <ImageScanningConfigDialog
        open={openImageScanningConfig}
        setOpen={setOpenImageScanningConfig}
      />
      <EditScannerDialog
        open={openEditScanner}
        setOpen={setOpenEditScanner}
        scannerId={selectedScanner}
      />
      <AddNewToolDialog open={openAddNew} setOpen={setOpenAddNew} />
    </>
  );
}
