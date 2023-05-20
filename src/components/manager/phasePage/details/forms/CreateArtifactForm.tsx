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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getCVEs } from "~/actions/vulnAction";
import { useAddArtifactToPhaseMutation, useThreatsQuery } from "~/hooks/query";
import { useCustomTheme } from "~/hooks/theme";
import { ArtifactCreate, Vulnerability } from "~/interfaces/Entity";
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
    setValue,
    watch,
  } = useForm<ArtifactCreate>({
    defaultValues: {
      threatList: [],
    },
  });
  const watchCpe = watch("cpe");
  useEffect(() => {
    if (watchCpe) {
      setValue("name", getValues("cpe")?.split(":")[4] ?? "");
      setValue("version", getValues("cpe")?.split(":")[5] ?? "");
    }
  }, [setValue, watchCpe]);
  const createArtifactMutation = useAddArtifactToPhaseMutation();
  const threatsQuery = useThreatsQuery();
  const threats = threatsQuery.data?.data ?? [];
  const [importedCves, setImportedCves] = useState<Vulnerability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useCustomTheme();
  async function searchCVEs() {
    setIsLoading(true);
    const value = getValues("cpe") ?? "";
    const { data } = await getCVEs(value);
    if (data) {
      setImportedCves(data);
      setIsLoading(false);
    }
  }
  async function submit(data: ArtifactCreate) {
    createArtifactMutation.mutate({ artifact: data, phaseId });
    setCloseDialog();
  }
  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <DialogTitle>Add a new artifact</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                required
                InputLabelProps={{ shrink: field.value ? true : false }}
              />
            )}
          />
          <TextField
            {...register("url", {
              required: "Url is required",
              pattern:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            })}
            label="URL"
            error={!!errors.url}
            helperText={
              errors.url?.type === "pattern"
                ? "Invalid URL"
                : errors.url?.message
            }
            required
          />
          <Controller
            name="version"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Version"
                InputLabelProps={{ shrink: field.value ? true : false }}
              />
            )}
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
                : "Hint: You can autofill name and version of the artifact by filling in the CPE string. Example of CPE string: cpe:2.3:a:apache:tomcat:3.0:*:*:*:*:*:*:* "
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
        <Button type="submit">Create</Button>
      </DialogActions>
    </Box>
  );
}
