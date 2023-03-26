import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import CreatePhaseModel from "~/components/phaseInfo/general/CreatePhaseModel";
import TaskInfo from "~/components/phaseInfo/general/TaskInfo";
import { useProjectInfoQuery } from "~/hooks/query";
import { useThemeHook } from "~/hooks/theme";

export default function PhaseInfo() {
  const theme = useThemeHook();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down("md"));
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const projectQuery = useProjectInfoQuery(currentProject);
  const project = projectQuery.data?.data;
  if (!project) return <></>;
  const { phaseList } = project;
  if (phaseList.length === 0) return <CreatePhaseModel />;
  return (
    <Box flexGrow={1} height="100vh">
      <Container sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={
              lessThanMedium
                ? { flexDirection: "column" }
                : { flexDirection: "row", flexWrap: "wrap" }
            }
          >
            {phaseList.map((phase, index) => (
              <Box key={index}>
                <Box component={Paper} sx={{ m: 2 }}>
                  <Card
                    sx={{
                      minWidth: {
                        md: 275,
                      },
                    }}
                  >
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
