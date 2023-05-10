import { Box, Breadcrumbs, Container, Link, Stack } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import TaskInfo from "~/components/manager/phasePage/general/cards/TaskCard";
import CreatePhaseTemplate from "~/components/manager/phasePage/general/forms/CreatePhaseTemplate";
import { useProjectInfoQuery } from "~/hooks/query";

export default function Phase() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const projectQuery = useProjectInfoQuery(currentProject);
  const project = projectQuery.data?.data;
  if (!project) return <></>;
  const { phaseList } = project;
  if (phaseList.length === 0) return <CreatePhaseTemplate />;
  return (
    <Box flexGrow={1} height="100vh">
      <Container sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={4}>
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
          <TaskInfo />
        </Stack>
      </Container>
    </Box>
  );
}
