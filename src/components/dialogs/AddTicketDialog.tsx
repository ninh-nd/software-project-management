import { AccountCircle, BugReport } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, HTMLAttributes, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAccountContext } from "~/hooks/general";
import {
  useArtifactsQuery,
  useCreateTicketMutation,
  useMembersQuery,
} from "~/hooks/query";
import { TicketCreate, Vulnerability } from "~/interfaces/Entity";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function AddTicketDialog({ open, setOpen }: Props) {
  const { currentProject } = useParams();
  const getAllArtifactsQuery = useArtifactsQuery(currentProject);
  const artifacts = getAllArtifactsQuery.data?.data;
  const vulns =
    artifacts?.flatMap((artifact) => artifact.vulnerabilityList) ?? [];
  const memberInfoQuery = useMembersQuery(currentProject);
  const createTicketMutation = useCreateTicketMutation();
  const memberInfo = memberInfoQuery.data?.data ?? [];
  const accountInfo = useAccountContext();
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
    const priority = selectedPriority.toLowerCase() as
      | "low"
      | "medium"
      | "high";
    const ticket = {
      ...data,
      assigner,
      priority,
      projectName: currentProject,
    };
    createTicketMutation.mutate(ticket);
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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
              <RadioGroup
                row
                value={selectedPriority}
                onChange={selectPriority}
              >
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
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Assignee</InputLabel>
                  <Select {...field} label="Assignee">
                    {memberInfo.map((member) => (
                      <MenuItem key={member._id} value={member._id}>
                        <ListItem>
                          <ListItemIcon>
                            <AccountCircle />
                          </ListItemIcon>
                          <ListItemText primary={member.account.username} />
                        </ListItem>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="targetedVulnerability"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={vulns}
                  onChange={(event, data) => onChange(data)}
                  renderOption={(props, option) => (
                    <VulnOption props={props} option={option} />
                  )}
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
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
function VulnOption({
  props,
  option,
}: {
  props: HTMLAttributes<HTMLLIElement>;
  option: Vulnerability;
}) {
  return (
    <ListItem {...props} key={option._id}>
      <ListItemIcon>
        <BugReport />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body1">{option.cveId}</Typography>}
        secondary={
          <>
            <Typography variant="body2">
              <b>Description:</b> {option.description}
            </Typography>
            <Typography variant="body2">
              <b>Score:</b> {option.score}
            </Typography>
            <Typography variant="body2">
              <b>Severity:</b> {option.severity}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}
