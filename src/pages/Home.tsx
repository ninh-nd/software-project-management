import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Chart from "~/components/manager/homePage/charts/Chart";
import MemberCard from "~/components/manager/homePage/cards/MemberCard";
import ProjectInfo from "~/components/manager/homePage/cards/ProjectInfo";
import TotalCommits from "~/components/manager/homePage/cards/TotalCommits";
import TotalPullRequests from "~/components/manager/homePage/cards/TotalPull";
import { useUserRole } from "~/hooks/general";
import { useActivityHistoryQuery } from "~/hooks/query";
function HomePageBasedOnRole({ role }: { role: string }) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const actHistQuery = useActivityHistoryQuery(currentProject);
  const actHist = actHistQuery.data?.data;
  if (!actHist) return <></>;
  const commits = actHist.filter((x) => x.action === "commit");
  const pullRequests = actHist.filter((x) => x.action === "pr");
  switch (role) {
    case "manager":
      return (
        <Box sx={{ flexGrow: 1, height: "100vh" }}>
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid container item spacing={2} xs={12} sm={12} md={6}>
                <Grid item xs={12} sm={6}>
                  <TotalCommits total={commits.length} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TotalPullRequests total={pullRequests.length} />
                </Grid>
                <Grid item xs={12}>
                  <MemberCard />
                </Grid>
              </Grid>
              <Grid container item spacing={2} xs={12} sm={12} md={6}>
                <Grid item xs={12}>
                  <ProjectInfo />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Chart activityHistory={actHist} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      );
    case "member":
      return (
        <Box sx={{ flexGrow: 1, height: "100vh" }}>
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}></Grid>
          </Container>
        </Box>
      );
    default:
      return <></>;
  }
}
export default function Home() {
  const role = useUserRole();
  return <HomePageBasedOnRole role={role} />;
}
