import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateNewScannerMutation,
  useSampleCode,
} from "~/hooks/fetching/scanner/query";
export default function AddNewToolDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateOrUpdateNewScanner>();
  const createNewScannerMutation = useCreateNewScannerMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [dockerfile, setDockerfile] = useState("");
  async function onSubmit(data: CreateOrUpdateNewScanner) {
    createNewScannerMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.status === "success") {
          setIsSuccess(true);
          setDockerfile(response.data);
        }
      },
    });
  }
  const sampleCodeQuery = useSampleCode();
  const sampleCode = sampleCodeQuery.data?.data;
  if (isSuccess) {
    return (
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>Generated Dockerfile</DialogTitle>
        <Stack spacing={2}>
          <Typography align="center">
            Use the Dockerfile below to spin up your own scanner instance
          </Typography>
          <ReactCodeMirror
            value={dockerfile}
            extensions={[langs.dockerfile()]}
            height="500px"
            editable={false}
          />
        </Stack>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add a new scanning tool</DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ p: 2, width: "40%" }}>
            <TextField
              label="Name"
              {...register("name", {
                required: "Name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Install command"
              {...register("config.installCommand", {
                required: "Install command is required",
              })}
              error={!!errors.config?.installCommand}
              helperText={
                errors.config?.installCommand?.message &&
                "This command will be used to install the tool in a Docker container"
              }
            />
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack spacing={2} sx={{ p: 2 }}>
            <Controller
              name="config.code"
              control={control}
              defaultValue={sampleCode?.sampleCode}
              render={({ field }) => (
                <ReactCodeMirror
                  {...field}
                  extensions={[langs.javascript()]}
                  width="800px"
                  height="500px"
                />
              )}
            />
            <ReactCodeMirror
              editable={false}
              value={sampleCode?.interface}
              extensions={[langs.typescript()]}
              width="800px"
              height="200px"
            />
          </Stack>
        </Box>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
