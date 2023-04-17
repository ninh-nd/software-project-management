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
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useAccountInfoQuery,
  useCreateTicketMutation,
  useMembersQuery,
  useVulnsQuery,
} from "~/hooks/query";
import { ITicketCreate } from "~/interfaces/Entity";
import FormItem from "../common/FormItem";
export default function AddTicketForm({
  setCloseDialog,
}: {
  setCloseDialog: () => void;
}) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const vulnQuery = useVulnsQuery();
  const accountInfoQuery = useAccountInfoQuery();
  const memberInfoQuery = useMembersQuery(currentProject);
  const createTicketMutation = useCreateTicketMutation();
  const vulns = vulnQuery.data?.data ?? [];
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
  } = useForm<ITicketCreate>();
  const [selectedPriority, setSelectedPriority] = useState<
    "Low" | "Medium" | "High"
  >("Low");
  function selectPriority(event: ChangeEvent<HTMLInputElement>) {
    setSelectedPriority(
      (event.target as HTMLInputElement).value as "Low" | "Medium" | "High"
    );
  }
  async function submit(data: ITicketCreate) {
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
    <Stack spacing={2} sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <FormItem label="Title">
          <TextField {...register("title")} label="Title" />
        </FormItem>
        <FormItem label="Description" />
        <TextField
          {...register("description")}
          label="Description"
          fullWidth
          multiline
          minRows={5}
        />
        <FormItem label="Priority">
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
        </FormItem>
        <FormItem label="Assigner">
          <TextField
            label="Assigner"
            defaultValue={accountInfo?.username}
            disabled
          />
        </FormItem>
        <FormItem label="Assignee">
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
        </FormItem>
        <FormItem label="Vulnerability">
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
        </FormItem>
        <Box display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "40%", height: "40%", m: 2 }}
          >
            Create new ticket
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
