import Chart from "~/components/home/chart/Chart";
import { getCommits, getPullRequests } from "~/actions/activityHistoryAction";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import TotalCommits from "~/components/home/featuredInfo/TotalCommits";
import TotalPullRequests from "~/components/home/featuredInfo/TotalPull";
import ProjectInfo from "~/components/home/featuredInfo/ProjectInfo";
import { useParams } from "react-router-dom";
import FullPageSkeleton from "~/components/common/FullPageSkeleton";
import MemberCard from "~/components/home/featuredInfo/MemberCard";
const Home = (): JSX.Element => {
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const commitsQuery = useQuery(["commits", currentProject], () =>
    getCommits(currentProject)
  );
  const pullRequestsQuery = useQuery(["pullRequests", currentProject], () =>
    getPullRequests(currentProject)
  );
  if (commitsQuery.isLoading || pullRequestsQuery.isLoading) {
    return <FullPageSkeleton />;
  }
  const commits = commitsQuery.data?.data;
  const pullRequests = pullRequestsQuery.data?.data;
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid container item spacing={2} xs={6}>
            <Grid item xs={6}>
              <TotalCommits commits={commits} />
            </Grid>
            <Grid item xs={6}>
              <TotalPullRequests prs={pullRequests} />
            </Grid>
            <Grid item xs={12}>
              <MemberCard />
            </Grid>
          </Grid>
          <Grid container item spacing={2} xs={6}>
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
};
export default Home;
