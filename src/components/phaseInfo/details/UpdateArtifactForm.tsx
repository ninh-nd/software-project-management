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
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormItem from "~/components/common/FormItem";
import {
  useArtifactQuery,
  useThreatsQuery,
  useUpdateArtifactMutation,
  useVulnsQuery,
} from "~/hooks/query";
import { IArtifact } from "~/interfaces/Artifact";
const type = ["image", "log", "source code", "executable", "library"];
interface CreateArtifactFormProps {
  phaseId: string;
  artifactId: string | undefined;
  setCloseDialog: () => void;
}
export default function UpdateArtifactForm({
  phaseId,
  artifactId,
  setCloseDialog,
}: CreateArtifactFormProps) {
  if (artifactId === undefined) {
    return <></>;
  }
  const { enqueueSnackbar } = useSnackbar();
  const [selectedType, setSelectedType] = React.useState(type[0]);
  const { register, handleSubmit, control } = useForm<IArtifact>();
  const getVulQuery = useVulnsQuery();
  const getThreatQuery = useThreatsQuery();
  const getArtifactQuery = useArtifactQuery(artifactId);
  const updateArtifactMutation = useUpdateArtifactMutation();
  const threats =
    getThreatQuery.data === undefined ? [] : getThreatQuery.data.data;
  const vulns = getVulQuery.data === undefined ? [] : getVulQuery.data.data;
  const artifact = getArtifactQuery.data?.data;
  if (
    artifact === undefined ||
    artifact === null ||
    vulns === null ||
    threats === null
  ) {
    enqueueSnackbar("Internal server error", { variant: "error" });
    return <></>;
  }
  const defaultValueThreats = threats.filter((threat) =>
    artifact.threatList.some((x) => x._id === threat._id)
  );
  const defaultValueVulns = vulns.filter((vuln) =>
    artifact.vulnerabilityList.some((x) => x._id === vuln._id)
  );
  function selectType(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedType((event.target as HTMLInputElement).value);
  }
  async function submit(data: IArtifact) {
    if (data.threatList === undefined) {
      data.threatList = defaultValueThreats;
    }
    if (data.vulnerabilityList === undefined) {
      data.vulnerabilityList = defaultValueVulns;
    }
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
    updateArtifactMutation.mutate({
      phaseId,
      artifactId,
      artifact: sendObject,
    });
    setCloseDialog();
  }
  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <FormItem label="Artifact's name">
          <TextField
            {...register("name")}
            label="Name"
            defaultValue={artifact.name}
          />
        </FormItem>
        <FormItem label="Type">
          <RadioGroup
            row
            value={selectedType}
            onChange={selectType}
            defaultValue={artifact.type}
          >
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
        </FormItem>
        {selectedType === "log" ? (
          <>
            <FormItem label="Content" />
            <TextField
              defaultValue={artifact.content}
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
              <TextField
                {...register("url")}
                label="URL"
                defaultValue={artifact.url}
              />
            </FormItem>
            <FormItem label="Version">
              <TextField
                {...register("version")}
                label="Version"
                defaultValue={artifact.version}
              />
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
                defaultValue={defaultValueVulns}
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
                defaultValue={defaultValueThreats}
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
            Update
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
