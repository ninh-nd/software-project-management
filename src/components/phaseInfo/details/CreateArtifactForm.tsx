import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormItem from "~/components/common/FormItem";
import {
  useAddArtifactToPhaseMutation,
  useThreatsQuery,
  useVulnsQuery,
} from "~/hooks/query";
import { IArtifact } from "~/interfaces/Entity";
const type = ["image", "log", "source code", "executable", "library"];
interface CreateArtifactFormProps {
  phaseId: string;
  setCloseDialog: () => void;
}
export default function CreateArtifactForm({
  phaseId,
  setCloseDialog,
}: CreateArtifactFormProps) {
  const { register, handleSubmit, control, watch } = useForm<IArtifact>();
  const getVulQuery = useVulnsQuery();
  const getThreatQuery = useThreatsQuery();
  const threats = getThreatQuery.data?.data ?? [];
  const vulns = getVulQuery.data?.data ?? [];
  const addArtifactToPhaseMutation = useAddArtifactToPhaseMutation();
  async function submit(data: IArtifact) {
    const threatIds =
      data.threatList === undefined
        ? []
        : data.threatList.map((threat) => threat._id);
    const vulnIds =
      data.vulnerabilityList === undefined
        ? []
        : data.vulnerabilityList.map((vuln) => vuln._id);
    const { name, type, content, url, version } = data;
    const sendObject = {
      name,
      type,
      content,
      url,
      version,
      threatList: threatIds,
      vulnerabilityList: vulnIds,
    };
    addArtifactToPhaseMutation.mutate({ phaseId, artifact: sendObject });
    setCloseDialog();
  }
  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <FormItem label="Artifact's name">
          <TextField {...register("name")} label="Name" />
        </FormItem>
        <FormItem label="Type">
          <Controller
            control={control}
            name="type"
            defaultValue="image"
            render={({ field }) => (
              <RadioGroup {...field} row>
                {type.map((t) => (
                  <FormControlLabel
                    {...register("type")}
                    value={t}
                    control={<Radio />}
                    label={t}
                    key={t}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormItem>
        {watch("type") === "log" ? (
          <>
            <FormItem label="Content" />
            <TextField
              {...register("content")}
              label="Content"
              multiline
              minRows={5}
              fullWidth
            />
          </>
        ) : (
          <>
            <FormItem label="URL">
              <TextField {...register("url")} label="URL" />
            </FormItem>
            <FormItem label="Version">
              <TextField {...register("version")} label="Version" />
            </FormItem>
          </>
        )}
        <FormItem label="Vulnerabilities">
          <Controller
            control={control}
            name="vulnerabilityList"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={vulns}
                onChange={(event, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.cveId}
                renderInput={(params) => (
                  <TextField {...params} label="Vulnerabilities" />
                )}
              />
            )}
          />
        </FormItem>
        <FormItem label="Threats">
          <Controller
            control={control}
            name="threatList"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={threats}
                onChange={(event, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Threats" />
                )}
              />
            )}
          />
        </FormItem>
        <Box display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "40%", height: "40%", m: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
