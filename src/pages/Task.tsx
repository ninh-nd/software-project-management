import { Box, Container, Stack, Toolbar, Typography } from "@mui/material";

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
          <Typography variant="h4">Task</Typography>
          
        </Stack>
      </Container>
    </Box>
  );
}
