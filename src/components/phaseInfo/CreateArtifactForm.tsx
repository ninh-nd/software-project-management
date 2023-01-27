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
import { useForm } from "react-hook-form";
import { IArtifact } from "~/interfaces/Artifact";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getVulnerabilities } from "~/actions/vulnAction";
import { getThreats } from "~/actions/threatActions";
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
export default function CreateArtifactForm() {
  const [selectedType, setSelectedType] = React.useState(type[0]);
  const { register, handleSubmit } = useForm<IArtifact>();
  const getVulQuery = useQuery(["vuln"], getVulnerabilities);
  const getThreatQuery = useQuery(["threat"], getThreats);
  const threats =
    getThreatQuery.data === undefined ? [] : getThreatQuery.data.data;
  const vulns = getVulQuery.data === undefined ? [] : getVulQuery.data.data;
  const selectType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType((event.target as HTMLInputElement).value);
  };
  const submit = (data: IArtifact) => {};
  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <FormItem label="Artifact's name">
          <TextField {...register("name")} label="Name" />
        </FormItem>
        <FormItem label="Type">
          <RadioGroup
            {...register("type")}
            row
            onChange={selectType}
            defaultValue={selectedType}
          >
            {type.map((t) => (
              <FormControlLabel
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
          <Autocomplete
            multiple
            options={vulns}
            getOptionLabel={(option) => option.cveId}
            renderInput={(params) => (
              <TextField {...params} label="Vulnerabilities" />
            )}
          />
        </FormItem>
        <FormItem label="Threats">
          <Autocomplete
            multiple
            options={threats}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Threats" />}
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
