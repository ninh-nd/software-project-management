import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Chart from "~/components/manager/homePage/charts/Chart";
import MemberCard from "~/components/manager/homePage/cards/MemberCard";
import ProjectInfo from "~/components/manager/homePage/cards/ProjectInfo";
import TotalCommits from "~/components/manager/homePage/cards/TotalCommits";
import TotalPullRequests from "~/components/manager/homePage/cards/TotalPull";
import { useUserRole } from "~/hooks/general";
import { useCommitsQuery, usePullRequestsQuery } from "~/hooks/query";
function HomePageBasedOnRole({ role }: { role: string }) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const commitsQuery = useCommitsQuery(currentProject);
  const pullRequestsQuery = usePullRequestsQuery(currentProject);
  const commits = commitsQuery.data?.data;
  const pullRequests = pullRequestsQuery.data?.data;
  if (!commits || !pullRequests) return <></>;
  switch (role) {
    case "manager":
      return (
        <Box sx={{ flexGrow: 1, height: "100vh" }}>
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid container item spacing={2} xs={12} sm={12} md={6}>
                <Grid item xs={12} sm={6}>
                  <TotalCommits commits={commits} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TotalPullRequests prs={pullRequests} />
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
                <Chart commits={commits} prs={pullRequests} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      );
    case "member":
      return <></>;
    default:
      return <></>;
  }
}
export default function Home() {
  const role = useUserRole();
  return <HomePageBasedOnRole role={role} />;
}
