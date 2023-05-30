import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import UnassginedTaskCard from "~/components/cards/UnassignedTaskCard";
import { useProjectInfoQuery } from "~/hooks/query";
import { useState } from "react";
import CreatePhaseTemplateDialog from "~/components/dialogs/CreatePhaseTemplateDialog";

export default function Phase() {
  const { currentProject } = useParams();
  const projectQuery = useProjectInfoQuery(currentProject);
  const project = projectQuery.data?.data;
  if (!project) return <></>;
  const { phaseList } = project;
  if (phaseList.length === 0) return <CreatePhaseTemplate />;
  return (
    <Box flexGrow={1} height="100vh">
      <Toolbar />
      <Container sx={{ my: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h4">Phases</Typography>
          <Box display="flex" justifyContent="center">
            <Breadcrumbs separator=">">
              {phaseList.map((phase) => (
                <Link
                  key={phase._id}
                  component={RouterLink}
                  to={`${phase._id}`}
                  underline="hover"
                  color="inherit"
                >
                  {phase.name}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>
          <UnassginedTaskCard />
        </Stack>
      </Container>
    </Box>
  );
}

function CreatePhaseTemplate() {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-evenly", flexGrow: "1" }}
    >
      <Box sx={{ p: "30px", display: "flex" }}>
        <Typography variant="h4">
          You haven't created a phase template yet. Do it now?
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: "20px" }}
          onClick={() => setOpen(true)}
        >
          Create a phase template
        </Button>
      </Box>
      <CreatePhaseTemplateDialog open={open} setOpen={setOpen} />
    </Box>
  );
}
