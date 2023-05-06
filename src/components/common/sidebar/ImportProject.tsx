import { GitHub } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetGithubRepo, useImportProjectMutation } from "~/hooks/query";
import { GithubRepoImport } from "~/interfaces/Entity";
interface Data {
  data: GithubRepoImport;
}
export default function ImportProject() {
  const [open, setOpen] = useState(false);
  const importProjectMutation = useImportProjectMutation();
  const { control, handleSubmit } = useForm<Data>();
  const importProjectListQuery = useGetGithubRepo();
  if (importProjectListQuery.isError) return <></>;
  const importProjectList = importProjectListQuery.data?.data ?? [];
  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  async function onSubmit(data: Data) {
    importProjectMutation.mutate(data.data);
    closeDialog();
  }
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={openDialog}
      >
        Import Project
      </Button>
      <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Import project from Github</DialogTitle>
          <DialogContent>
            <Controller
              name="data"
              control={control}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  onChange={(event, newValue) => onChange(newValue)}
                  options={importProjectList}
                  getOptionLabel={(option) => option.url}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > svg": { mr: 2 } }}
                      {...props}
                    >
                      <GitHub />
                      {option.owner}/{option.name}
                      <Chip label={option.status} sx={{ ml: 1 }} />
                    </Box>
                  )}
                  renderInput={(params) => (
                    <Box>
                      <TextField {...params} label="Choose a project" />
                    </Box>
                  )}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="inherit">
              Cancel
            </Button>
            <Button type="submit">Import</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
