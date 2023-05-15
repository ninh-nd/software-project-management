import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getCVEs } from "~/actions/vulnAction";
import {
  useArtifactQuery,
  useThreatsQuery,
  useUpdateArtifactMutation,
} from "~/hooks/query";
import { useCustomTheme } from "~/hooks/theme";
import { ArtifactUpdate, Vulnerability } from "~/interfaces/Entity";
const type = ["image", "log", "source code", "executable", "library"];
interface UpdateArtifactFormProps {
  setCloseDialog: () => void;
  artifactId: string;
}
export default function UpdateArtifactForm({
  setCloseDialog,
  artifactId,
}: UpdateArtifactFormProps) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<ArtifactUpdate>({
    defaultValues: {
      threatList: [],
    },
  });
  const threatsQuery = useThreatsQuery();
  const threats = threatsQuery.data?.data ?? [];
  const updateArtifactMutation = useUpdateArtifactMutation();
  const artifactQuery = useArtifactQuery(artifactId);
  const artifact = artifactQuery.data?.data;
  const [importedCves, setImportedCves] = useState<Vulnerability[]>(
    artifact?.vulnerabilityList ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const theme = useCustomTheme();
  if (!artifact) return <></>;
  async function searchCVEs() {
    setIsLoading(true);
    const value = getValues("cpe") ?? "";
    const { data } = await getCVEs(value);
    if (data) {
      setImportedCves(data);
      setIsLoading(false);
    }
  }
  async function submit(data: ArtifactUpdate) {
    updateArtifactMutation.mutate({
      artifactId,
      artifact: data,
    });
    setCloseDialog();
  }
  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <DialogTitle>Update this artifact</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            {...register("name", { required: "Name is required" })}
            defaultValue={artifact.name}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            required
          />
          <TextField
            {...register("url", {
              required: "Url is required",
              pattern:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            })}
            defaultValue={artifact.url}
            label="URL"
            error={!!errors.url}
            helperText={
              errors.url?.type === "pattern"
                ? "Invalid URL"
                : errors.url?.message
            }
            required
          />
          <TextField
            {...register("cpe", {
              pattern:
                /cpe:2\.3:[aho\*\-](:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\*\-]))(:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){4}/,
            })}
            defaultValue={artifact.cpe}
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
            <RadioGroup row defaultValue={artifact.type}>
              {type.map((item) => (
                <FormControlLabel
                  disabled
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2">Threats</Typography>
            <Controller
              name="threatList"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  renderValue={(selected) => selected.join(", ")}
                  defaultValue={[]}
                  sx={{ minWidth: 200, maxWidth: 400 }}
                >
                  {threats.map((threat) => (
                    <MenuItem key={threat._id} value={threat.name}>
                      <Checkbox
                        checked={
                          getValues("threatList").indexOf(threat.name) > -1
                        }
                      />
                      <ListItemText primary={threat.name} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={setCloseDialog} color="inherit">
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Box>
  );
}
