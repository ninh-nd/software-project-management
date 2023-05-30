import { Box, Container, Toolbar } from "@mui/material";
import ExtendedTicketTable from "~/components/styled-components/TicketTable";

export default function Ticket() {
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
        <ExtendedTicketTable />
      </Container>
    </Box>
  );
}
