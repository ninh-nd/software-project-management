import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { updateArtifact } from "~/actions/phaseAction";
import { getThreats } from "~/actions/threatActions";
import { getVulnerabilities } from "~/actions/vulnAction";
import { IArtifact } from "~/interfaces/Artifact";
const type = ["image", "log", "source code", "executable", "library"];
const FormItem = ({
  label,
  children,
}: {
  label: string;
  children?: JSX.Element | JSX.Element[];
}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{ p: 1 }}
  >
    <Typography variant="h6">{label}</Typography>
    {children}
  </Box>
);
interface CreateArtifactFormProps {
  phaseId: string;
  artifact: IArtifact;
  setCloseDialog: () => void;
  setOpenSnackbar?: ({
    open,
    status,
  }: {
    open: boolean;
    status: "success" | "error";
  }) => void;
}
export default function UpdateArtifactForm({
  phaseId,
  artifact,
  setCloseDialog,
  setOpenSnackbar,
}: CreateArtifactFormProps) {
  const queryClient = useQueryClient();
  const { currentProject } = useParams();
  const [selectedType, setSelectedType] = React.useState(type[0]);
  const { register, handleSubmit, control } = useForm<IArtifact>();
  const getVulQuery = useQuery(["vuln"], getVulnerabilities);
  const getThreatQuery = useQuery(["threat"], getThreats);
  const threats =
    getThreatQuery.data === undefined ? [] : getThreatQuery.data.data;
  const vulns = getVulQuery.data === undefined ? [] : getVulQuery.data.data;
  const selectType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType((event.target as HTMLInputElement).value);
  };
  const submit = async (data: IArtifact) => {
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
    const response = await updateArtifact(phaseId, artifact._id, sendObject);
    if (response.status === "success") {
      queryClient.invalidateQueries(["phaseList", currentProject]);
      setCloseDialog();
      if (setOpenSnackbar !== undefined)
        setOpenSnackbar({ open: true, status: "success" });
    } else {
      setCloseDialog();
      if (setOpenSnackbar !== undefined)
        setOpenSnackbar({ open: true, status: "error" });
    }
  };
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
            Update
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
