import {
  Autocomplete,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getAccountInfo } from "~/actions/accountAction";
import { ITicketCreate } from "~/interfaces/Ticket";
import FormItem from "../common/FormItem";
import { getMembersOfProject } from "~/actions/memberAction";
import { getVulnerabilities } from "~/actions/vulnAction";
import { createTicket } from "~/actions/ticketAction";
import { useSnackbar } from "notistack";
export default function AddTicketForm({
  setCloseDialog,
}: {
  setCloseDialog: () => void;
}) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const vulnQuery = useQuery(["vuln"], getVulnerabilities);
  const accountInfoQuery = useQuery(["accountInfo"], getAccountInfo);
  const memberInfoQuery = useQuery(["memberList", currentProject], () =>
    getMembersOfProject(currentProject)
  );
  const vulns = vulnQuery.data === undefined ? [] : vulnQuery.data.data;
  const memberInfo =
    memberInfoQuery.data === undefined ? [] : memberInfoQuery.data.data;
  const accountInfo = accountInfoQuery.data?.data;
  if (vulns === null || memberInfo === null || accountInfo === null) {
    enqueueSnackbar("Internal server error", { variant: "error" });
    return <></>;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ITicketCreate>();
  const [selectedPriority, setSelectedPriority] = React.useState<
    "Low" | "Medium" | "High"
  >("Low");
  function selectPriority(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedPriority(
      (event.target as HTMLInputElement).value as "Low" | "Medium" | "High"
    );
  }
  async function submit(data: ITicketCreate) {
    const assigner = accountInfo === undefined ? "" : accountInfo._id;
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
    const response = await createTicket(ticket);
    if (response.status === "success") {
      queryClient.invalidateQueries(["ticket"]);
      setCloseDialog();
      enqueueSnackbar("Create ticket successfully", { variant: "success" });
    } else {
      setCloseDialog();
      enqueueSnackbar(response.message, { variant: "error" });
    }
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
