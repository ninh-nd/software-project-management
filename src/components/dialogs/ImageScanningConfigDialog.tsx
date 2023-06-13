import { ContentCopy, CopyAll } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

export default function ImageScanningConfigDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <DialogTitle>Configure image scanning tool</DialogTitle>
      <Box sx={{ display: "flex" }}>
        <Stack spacing={2} sx={{ m: 2, width: "50%" }}>
          <FormControl>
            <FormLabel>Service</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="trivy"
                control={<Radio />}
                label="Trivy"
              />
              <FormControlLabel
                value="grype"
                control={<Radio />}
                label="Grype"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Endpoint</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="default"
                control={<Radio />}
                label="Use existing endpoint"
              />
              <FormControlLabel
                value="self-hosted"
                control={<Radio />}
                label="Self-hosted"
              />
            </RadioGroup>
          </FormControl>
          <TextField label="Endpoint" fullWidth />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={2} sx={{ m: 2 }}>
          <Typography variant="h6" align="center">
            Self-hosted instruction
          </Typography>
          <Typography variant="body2" align="center">
            To use self-hosted endpoint, you need to pull the Docker image of
            choice and deploy a container of that image on your favorite
            hosting.
          </Typography>
          <TextField
            label="Trivy"
            value="docker pull sample"
            disabled
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText("docker pull sample");
                      enqueueSnackbar("Copied to clipboard", {
                        variant: "success",
                      });
                    }}
                  >
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Grype"
            value="docker pull sample"
            disabled
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText("docker pull sample");
                      enqueueSnackbar("Copied to clipboard", {
                        variant: "success",
                      });
                    }}
                  >
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
