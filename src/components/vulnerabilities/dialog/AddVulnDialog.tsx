import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCVE } from "~/actions/vulnAction";
import FormWrapper from "~/components/common/FormWrapper";
import { useCreateCVEMutation, useCreateCVEsMutation } from "~/hooks/query";
import { IVulnerabilityCreate } from "~/interfaces/Entity";

export default function AddVulnDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { register, handleSubmit } = useForm<{ cveId: string }>();
  const { register: registerMultiple, handleSubmit: handleSubmitMultiple } =
    useForm<{ cveIds: string }>();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [cve, setCve] = useState<IVulnerabilityCreate>({
    cveId: "",
    description: "",
    product: "",
    version: [],
    vendor: "",
    score: 0,
    cwes: [],
  });
  const { product, version, vendor, score, cwes } = cve;
  async function searchCve({ cveId }: { cveId: string }) {
    const { data } = await getCVE(cveId);
    if (!data) {
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
  }
  const importOneCveMutation = useCreateCVEMutation();
  const importMultipleCvesMutation = useCreateCVEsMutation();
  async function importSingleCve() {
    if (error) {
      return;
    }
    importOneCveMutation.mutate({ cveId: cve.cveId });
    setOpen(false);
  }
  async function importMultipleCve({ cveIds }: { cveIds: string }) {
    importMultipleCvesMutation.mutate({ cveIds });
    setOpen(false);
  }
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
