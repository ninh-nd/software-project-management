import {
  Badge,
  Box,
  Button,
  Dialog,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FormWrapper from "~/components/common/FormWrapper";
import AddTicketForm from "~/components/ticket/AddTicketForm";
import { ITicket } from "~/interfaces/Ticket";

interface TabProps {
  title: string;
  issueList: ITicket[];
}
function Tab({ title, issueList }: TabProps) {
  return (
    <Paper elevation={3} sx={{ height: "73vh" }}>
      <Box>
        <Badge
          badgeContent={issueList.length}
          color="primary"
          sx={{ m: 2 }}
          max={10}
        >
          <Typography variant="h6" display="inline">
            {title}
          </Typography>
        </Badge>
      </Box>
      <Stack sx={{ p: 2 }} spacing={0.5}>
        {issueList.map((issue) => (
          <Paper key={issue._id} sx={{ height: "5em" }} variant="outlined">
            <Link underline="hover">
              <Typography variant="body1" sx={{ m: 2 }}>
                {issue.title}
              </Typography>
            </Link>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}

export default function TicketPage() {
  const [open, setOpen] = React.useState(false);

  const issueList = [
    { id: 1, title: "test1", description: "test1", status: "todo" },
    { id: 2, title: "test2", description: "test2", status: "todo" },
    { id: 3, title: "test3", description: "test3", status: "todo" },
  ];
  return (
    <Box flexGrow={1} sx={{ m: 10 }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={3}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Ticket
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={3}>
          <Tab title="Open" issueList={issueList} />
        </Grid>
        <Grid item xs={3}>
          <Tab title="Close" issueList={issueList} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <FormWrapper
          title="Add Ticket"
          closeDialogFunction={() => setOpen(false)}
        >
          <AddTicketForm />
        </FormWrapper>
      </Dialog>
    </Box>
  );
}
