import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getCVEs } from "~/actions/vulnAction";
import { useThemeHook } from "~/hooks/theme";
import { IArtifact, IVulnerability } from "~/interfaces/Entity";
const type = ["image", "log", "source code", "executable", "library"];
interface CreateArtifactFormProps {
  phaseId: string;
  setCloseDialog: () => void;
}
export default function CreateArtifactForm({
  phaseId,
  setCloseDialog,
}: CreateArtifactFormProps) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<IArtifact>({ mode: "onChange" });
  const [importedCves, setImportedCves] = useState<IVulnerability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useThemeHook();
  async function searchCVEs() {
    setIsLoading(true);
    const value = getValues("cpe") ?? "";
    const { data } = await getCVEs(value);
    if (data) {
      setImportedCves(data);
      setIsLoading(false);
    }
  }
  async function submit(data) {}
  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <DialogTitle>Add a new artifact</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            {...register("name", { required: "Name is required" })}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("url", { required: "Url is required" })}
            label="URL"
            error={!!errors.url}
            helperText={errors.url?.message}
          />
          <TextField
            {...register("cpe", {
              pattern:
                /cpe:2\.3:[aho\*\-](:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\*\-]))(:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){4}/,
            })}
            label="CPE string"
            helperText={
              errors.cpe
                ? "Invalid CPE string"
                : "A CPE is a Common Platform Enumaration, used as a naming scheme for software and packages. For example: cpe:2.3:a:apache:tomcat:3.0:*:*:*:*:*:*:* is a CPE string for Apache Tomcat 3.0. This string will be used to automatically import vulnerabilities from the NVD."
            }
            error={!!errors.cpe}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2">Type</Typography>
            <Controller
              name="type"
              control={control}
              defaultValue="image"
              render={({ field }) => (
                <RadioGroup {...field} row>
                  {type.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="outlined" onClick={searchCVEs}>
              Import vulnerabilities using CPE
            </Button>
            <Typography variant="body1" color={theme.palette.error.main}>
              {isLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
              {`Found ${importedCves.length} vulnerabilities`}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={setCloseDialog}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Box>
  );
}
