import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Chart from "~/components/home/chart/Chart";
import MemberCard from "~/components/home/featuredInfo/MemberCard";
import ProjectInfo from "~/components/home/featuredInfo/ProjectInfo";
import TotalCommits from "~/components/home/featuredInfo/TotalCommits";
import TotalPullRequests from "~/components/home/featuredInfo/TotalPull";
import { useCommitsQuery, usePullRequestsQuery } from "~/hooks/query";
import { ICommits, IPullRequests } from "~/interfaces/GithubData";
export default function Home() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const commitsQuery = useCommitsQuery(currentProject);
  const pullRequestsQuery = usePullRequestsQuery(currentProject);
  const commits = commitsQuery.data?.data ?? ({} as ICommits);
  const pullRequests = pullRequestsQuery.data?.data ?? ({} as IPullRequests);
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
}
