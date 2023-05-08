import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useAccountInfoQuery,
  useCreateTicketMutation,
  useMembersQuery,
} from "~/hooks/query";
import { TicketCreate } from "~/interfaces/Entity";
export default function AddTicketForm({
  setCloseDialog,
}: {
  setCloseDialog: () => void;
}) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const accountInfoQuery = useAccountInfoQuery();
  const memberInfoQuery = useMembersQuery(currentProject);
  const createTicketMutation = useCreateTicketMutation();
  const memberInfo = memberInfoQuery.data?.data ?? [];
  const accountInfo = accountInfoQuery.data?.data;
  if (!accountInfo) {
    return <></>;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TicketCreate>();
  const [selectedPriority, setSelectedPriority] = useState<
    "Low" | "Medium" | "High"
  >("Low");
  function selectPriority(event: ChangeEvent<HTMLInputElement>) {
    setSelectedPriority(
      (event.target as HTMLInputElement).value as "Low" | "Medium" | "High"
    );
  }
  async function submit(data: TicketCreate) {
    if (!accountInfo || !currentProject) return;
    const assigner = accountInfo._id;
    const assignee = data.assignee.map((item) => item._id);
    const vulnerability = data.targetedVulnerability.map((item) => item._id);
    const priority = selectedPriority.toLowerCase() as
      | "low"
      | "medium"
      | "high";
    const ticket = {
      ...data,
      assigner,
      assignee,
      priority,
      projectName: currentProject,
      targetedVulnerability: vulnerability,
    };
    createTicketMutation.mutate(ticket);
    setCloseDialog();
  }
  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <DialogTitle>Create a new ticket</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">Title</Typography>
            <TextField {...register("title")} label="Title" />
          </Box>
          <TextField
            {...register("description")}
            label="Description"
            fullWidth
            multiline
            minRows={5}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">Priority</Typography>
            <RadioGroup row value={selectedPriority} onChange={selectPriority}>
              {["Low", "Medium", "High"].map((p) => (
                <FormControlLabel
                  {...register("priority")}
                  value={p}
                  control={<Radio />}
                  label={
                    p === "Low" ? (
                      <Box color="green">Low</Box>
                    ) : p === "Medium" ? (
                      <Box color="orange">Medium</Box>
                    ) : (
                      <Box color="red">High</Box>
                    )
                  }
                  key={p}
                />
              ))}
            </RadioGroup>
          </Box>
          <TextField
            label="Assigner"
            defaultValue={accountInfo?.username}
            disabled
          />
          <Controller
            control={control}
            name="assignee"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={memberInfo}
                onChange={(event, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.account.username}
                renderInput={(params) => (
                  <TextField {...params} label="Assignee" />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="targetedVulnerability"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={vulns}
                onChange={(event, newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Vulnerability" />
                )}
                getOptionLabel={(option) => option.cveId}
              />
            )}
          />
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
