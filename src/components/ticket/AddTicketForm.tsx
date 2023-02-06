import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { ITicketCreate } from "~/interfaces/Ticket";
import FormItem from "../common/FormItem";

export default function AddTicketForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITicketCreate>();
  const [selectedPriority, setSelectedPriority] = React.useState<
    "Low" | "Medium" | "High"
  >("Low");
  const selectPriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPriority(
      (event.target as HTMLInputElement).value as "Low" | "Medium" | "High"
    );
  };
  const submit = async (data: ITicketCreate) => {};
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
          <TextField label="Assigner" defaultValue="helloworld" disabled />
        </FormItem>
        <FormItem label="Assignee"></FormItem>
      </Box>
    </Stack>
  );
}
