import { GitHub } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAccountInfoQuery, useGetImportProjectsQuery } from "~/hooks/query";

export default function ImportProject() {
  const [open, setOpen] = useState(false);
  const accountInfoQuery = useAccountInfoQuery();
  const accountInfo = accountInfoQuery.data?.data;
  const githubInfoFromAccountInfo = accountInfo?.thirdParty.find(
    (x) => x.name === "Github"
  );
  const username = githubInfoFromAccountInfo?.username;
  const accessToken = githubInfoFromAccountInfo?.accessToken;
  const importProjectListQuery = useGetImportProjectsQuery(
    username,
    accessToken
  );
  if (importProjectListQuery.isError) return <></>;
  const importProjectList = importProjectListQuery.data?.data ?? [];
  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  function importProject() {}
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
        <DialogTitle>Import project from Github</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={importProjectList}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box {...props} component="li" sx={{ "& > svg": { mr: 2 } }}>
                <GitHub />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <Box>
                <TextField {...params} label="Choose a project" />
              </Box>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={importProject}>Import</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
