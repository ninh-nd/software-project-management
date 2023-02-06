import {
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { createCVE, createCVEs, getCVE } from "~/actions/vulnAction";
import FormWrapper from "~/components/common/FormWrapper";
import { IVulnerabilityCreate } from "~/interfaces/Vulnerability";

export default function AddVulnDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<{ cveId: string }>();
  const { register: registerMultiple, handleSubmit: handleSubmitMultiple } =
    useForm<{ cveIds: string }>();
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [cve, setCve] = React.useState<IVulnerabilityCreate>({
    cveId: "",
    description: "",
    product: "",
    version: [],
    vendor: "",
    score: 0,
    cwes: [],
  });
  const { product, version, vendor, score, cwes } = cve;
  const searchCve = async ({ cveId }: { cveId: string }) => {
    const { data } = await getCVE(cveId);
    if (data === null) {
      setError(true);
      setErrorText("CVE-ID not found");
      return;
    } else {
      setError(false);
      setErrorText("");
    }
    const {
      cveId: id,
      description,
      product,
      version,
      vendor,
      score,
      cwes,
    } = data;
    setCve({
      cveId: id,
      description,
      product,
      version,
      vendor,
      score,
      cwes,
    });
  };
  const importSingleCve = async () => {
    if (error) {
      return;
    }
    const response = await createCVE(cve.cveId);
    if (response.status === "success") {
      queryClient.invalidateQueries(["vuln"]);
      enqueueSnackbar("Vulnerability created", { variant: "success" });
      setOpen(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setOpen(false);
    }
  };
  const importMultipleCve = async ({ cveIds }: { cveIds: string }) => {
    const response = await createCVEs(cveIds);
    if (response.status === "success") {
      queryClient.invalidateQueries(["vuln"]);
      enqueueSnackbar("Vulnerabilities created", { variant: "success" });
      setOpen(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <FormWrapper
        title="Add vulnerability"
        closeDialogFunction={() => setOpen(false)}
      >
        <Box sx={{ p: 2, height: "50vh", width: "20vw" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            component="form"
            onSubmit={handleSubmit(searchCve)}
          >
            <TextField
              margin="normal"
              required
              autoFocus
              label="CVE-ID"
              variant="standard"
              {...register("cveId")}
              error={error}
              helperText={errorText}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: "16px", mb: "8px" }}
              type="submit"
            >
              Search CVE
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <TextField
              margin="normal"
              label="Product"
              variant="standard"
              disabled
              value={product}
            />
            <TextField
              margin="normal"
              label="Version"
              variant="standard"
              disabled
              value={version}
            />
            <TextField
              margin="normal"
              label="Vendor"
              variant="standard"
              disabled
              value={vendor}
            />
            <TextField
              margin="normal"
              label="Score"
              variant="standard"
              disabled
              value={score}
            />
            <TextField
              margin="normal"
              label="CWE-ID"
              variant="standard"
              disabled
              value={cwes}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 2 }}
              onClick={importSingleCve}
            >
              Import this CVE
            </Button>
          </Box>
          <Divider>OR</Divider>
          <Stack
            spacing={2}
            component="form"
            onSubmit={handleSubmitMultiple(importMultipleCve)}
          >
            <Typography variant="body1">
              Type in multiple CVE-ID seperated by commas to import batch
            </Typography>
            <Typography variant="caption">
              Example: CVE-2021-1411, CVE-2021-1412, CVE-2021-1413
            </Typography>
            <TextField
              label="CVE-ID"
              variant="standard"
              fullWidth
              {...registerMultiple("cveIds")}
            />
            <Button variant="contained" color="primary" type="submit">
              Import batch
            </Button>
          </Stack>
        </Box>
      </FormWrapper>
    </Dialog>
  );
}
