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
import { Controller, useForm } from "react-hook-form";
import { useGetScanners } from "~/hooks/fetching/scanner/query";

export default function ImageScanningConfigDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { register, control, watch, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const watchSelection = watch("endpointSelection");
  const scannersQuery = useGetScanners();
  const scanners = scannersQuery.data?.data;
  async function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Configure image scanning tool</DialogTitle>
        <Box sx={{ display: "flex" }}>
          <Stack spacing={2} sx={{ m: 2, width: "30%" }}>
            <FormControl>
              <FormLabel>Service</FormLabel>
              <Controller
                name="service"
                defaultValue="grype"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    {scanners?.map((scanner) => (
                      <FormControlLabel
                        key={scanner.name}
                        value={scanner.name}
                        control={<Radio />}
                        label={scanner.name}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Endpoint</FormLabel>
              <Controller
                name="endpointSelection"
                control={control}
                defaultValue="default"
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="default"
                      control={<Radio />}
                      label="Use default endpoint"
                    />
                    <FormControlLabel
                      value="self-hosted"
                      control={<Radio />}
                      label="Self-hosted"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {watchSelection === "self-hosted" && (
              <TextField label="Endpoint" fullWidth />
            )}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack spacing={2} sx={{ m: 2 }}>
            <Typography variant="h6" align="center">
              Self-hosted instruction
            </Typography>
            <Typography variant="body1">
              1. Pull the image from Docker Hub using commands provided below
            </Typography>
            <TextField
              label="Grype"
              value="docker pull ninhnd/grype"
              disabled
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "docker pull ninhnd/grype"
                        );
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
            <Typography variant="body1">
              2. Deploy the container created from the image to your favorite
              hosting
            </Typography>
            <Typography variant="body1">
              3. Select corresonding service and fill in the endpoint at
              "Self-hosted" option
            </Typography>
          </Stack>
        </Box>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
