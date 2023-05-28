import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import OverdueTaskCard from "~/components/OverdueTaskCard";

export default function Task() {
  return (
    <Box
      flexGrow={1}
      sx={{
        m: {
          xs: 2,
          sm: 4,
        },
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">Task</Typography>
            <Button variant="contained">Create a task</Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <OverdueTaskCard total={3} />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
