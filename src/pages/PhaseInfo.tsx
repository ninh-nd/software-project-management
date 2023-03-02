import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Paper,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getProjectInfo } from "~/actions/projectAction";
import CreatePhaseModel from "~/components/phaseInfo/general/CreatePhaseModel";
import TaskInfo from "~/components/phaseInfo/general/TaskInfo";

export default function PhaseInfo() {
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const phaseQuery = useQuery(["phaseList", currentProject], () =>
    getProjectInfo(currentProject)
  );
  const phaseList = phaseQuery.data?.data.phaseList;
  if (phaseList === undefined) return <></>;
  if (phaseList.length === 0) return <CreatePhaseModel />;
  return (
    <Box flexGrow={1} height="100vh">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={4}>
          <Box display="flex" justifyContent="space-evenly">
            {phaseList.map((phase, index) => (
              <Box key={index}>
                <Box component={Paper} sx={{ ml: 2, mr: 2 }}>
                  <Card sx={{ minWidth: "15vw" }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {phase.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {phase?.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        component={RouterLink}
                        to={`${phase._id}`}
                        underline="none"
                      >
                        <Button size="small">Details</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            <TaskInfo />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
