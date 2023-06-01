import { Box, Container, Toolbar, Typography } from "@mui/material";

export default function FirstTimeLoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" align="center">
          Import your projects from Gitlab or Github using the project selection
          on the topbar
        </Typography>
      </Container>
    </Box>
  );
}
