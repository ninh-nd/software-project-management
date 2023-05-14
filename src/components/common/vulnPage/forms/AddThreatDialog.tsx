import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { useCreateThreatMutation } from "~/hooks/query";
import { ThreatCreate } from "~/interfaces/Entity";
const typeOptions = [
  {
    name: "Spoofing",
    description:
      "Threat action aimed at accessing and use of another user’s credentials, such as username and password.",
  },
  {
    name: "Tampering",
    description:
      "Threat action intending to maliciously change or modify persistent data, such as records in a database, and the alteration of data in transit between two computers over an open network, such as the Internet.",
  },
  {
    name: "Repuditation",
    description:
      "Threat action aimed at performing prohibited operations in a system that lacks the ability to trace the operations.",
  },
  {
    name: "Information Disclosure",
    description:
      "Threat action intending to read a file that one was not granted access to, or to read data in transit.",
  },
  {
    name: "Denial of Service",
    description:
      "Threat action attempting to deny access to valid users, such as by making a web server temporarily unavailable or unusable.",
  },
  {
    name: "Elevation of Privilege",
    description:
      "Threat action intending to gain privileged access to resources in order to gain unauthorized access to information or to compromise a system.",
  },
];
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
function ScoreSlider({
  registerString,
  text,
  getValues,
  setValue,
  control,
}: {
  registerString:
    | "score.details.damage"
    | "score.details.reproducibility"
    | "score.details.exploitability"
    | "score.details.affectedUsers"
    | "score.details.discoverability";
  text: string;
  getValues: UseFormGetValues<ThreatCreate>;
  setValue: UseFormSetValue<ThreatCreate>;
  control: Control<ThreatCreate, any>;
}) {
  return (
    <Stack spacing={1} justifyContent="center">
      <Typography variant="subtitle2">{text}</Typography>
      <Controller
        name={registerString}
        control={control}
        render={({ field }) => (
          <Slider
            {...field}
            defaultValue={0}
            step={1}
            min={0}
            max={10}
            marks
            valueLabelDisplay="auto"
          />
        )}
      />
    </Stack>
  );
}
export default function AddThreatDialog({ open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<ThreatCreate>({
    defaultValues: {
      name: "",
      description: "",
      type: "spoofing",
      score: {
        total: 0,
        details: {
          damage: 0,
          reproducibility: 0,
          exploitability: 0,
          affectedUsers: 0,
          discoverability: 0,
        },
      },
    },
  });
  const watchFields = watch([
    "score.details.damage",
    "score.details.reproducibility",
    "score.details.exploitability",
    "score.details.affectedUsers",
    "score.details.discoverability",
  ]);
  useEffect(() => {
    reset();
  }, [open]);
  useEffect(() => {
    const sum = Object.values(watchFields).reduce((a, b) => a + b, 0);
    setValue("score.total", sum / 5);
  }, [
    getValues("score.details.damage"),
    getValues("score.details.affectedUsers"),
    getValues("score.details.discoverability"),
    getValues("score.details.exploitability"),
    getValues("score.details.reproducibility"),
  ]);
  const createThreatMutation = useCreateThreatMutation();
  async function submit(data: ThreatCreate) {
    createThreatMutation.mutate(data);
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create a new threat</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          autoFocus
          label="Name"
          variant="standard"
          {...register("name", {
            required: "Name is required",
          })}
          error={errors.name !== undefined}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          label="Description"
          variant="standard"
          {...register("description", {
            required: "Description is required",
          })}
          error={errors.description !== undefined}
          helperText={errors.description?.message}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Type</Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {typeOptions.map((opt) => (
                  <MenuItem key={opt.name} value={opt.name.toLowerCase()}>
                    <Tooltip title={opt.description}>
                      <ListItemText primary={opt.name} />
                    </Tooltip>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Box>
        <ScoreSlider
          control={control}
          registerString="score.details.damage"
          text="Damage: How big would the damage be if the attack succeeded?"
          getValues={getValues}
          setValue={setValue}
        />
        <ScoreSlider
          control={control}
          registerString="score.details.reproducibility"
          text="Reproducibility: How easy is it to reproduce the attack?"
          getValues={getValues}
          setValue={setValue}
        />
        <ScoreSlider
          control={control}
          registerString="score.details.exploitability"
          text="Exploitability: How easy is it to exploit the vulnerability?"
          getValues={getValues}
          setValue={setValue}
        />
        <ScoreSlider
          control={control}
          registerString="score.details.affectedUsers"
          text="Affected Users: How many users are affected by the vulnerability?"
          getValues={getValues}
          setValue={setValue}
        />
        <ScoreSlider
          control={control}
          registerString="score.details.discoverability"
          text="Discoverability: How easy is it to discover the vulnerability?"
          getValues={getValues}
          setValue={setValue}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Final score</Typography>
          <Typography variant="subtitle1">
            <TextField {...register("score.total")} disabled />
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
