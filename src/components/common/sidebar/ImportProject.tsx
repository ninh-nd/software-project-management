import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAccountInfoQuery, useGetImportProjectsQuery } from "~/hooks/query";
import FormWrapper from "~/components/common/FormWrapper";
import GitHub from "@mui/icons-material/GitHub";

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
        <Box sx={{ p: 2 }}>
          <FormWrapper title="Import project" closeDialogFunction={closeDialog}>
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
          </FormWrapper>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={importProject}
          >
            Import
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
