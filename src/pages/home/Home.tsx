import Chart from '~/components/home/chart/Chart';
import { getCommits, getPullRequests } from '~/actions/activityHistoryAction';
import { Commits, PullRequests } from '~/interfaces/GithubData';
import { useQuery } from '@tanstack/react-query';
import ServerResponse from '~/interfaces/ServerResponse';
import { Box, Container, Grid, Skeleton } from '@mui/material';
import TotalCommits from '~/components/home/featuredInfo/TotalCommits';
import TotalPullRequests from '~/components/home/featuredInfo/TotalPull';
import ProjectInfo from '~/components/home/featuredInfo/ProjectInfo';
import "~/styles/style.scss";
import { useParams } from 'react-router-dom';
const Home = (): JSX.Element => {
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const commits = useQuery<ServerResponse<Commits>>(['commits'], () => getCommits(currentProject));
  const pullRequests = useQuery<ServerResponse<PullRequests>>(['pullRequests'], () => getPullRequests(currentProject));
  if (commits.isLoading || pullRequests.isLoading) {
    return <Skeleton variant="rounded" className="fullPageSkeleton" />;
  }
  if (commits.isError || pullRequests.isError) {
    return <div>Error</div>;
  }
  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TotalCommits commits={commits.data.data} />
          </Grid>
          <Grid item xs={3}>
            <TotalPullRequests prs={pullRequests.data.data} />
          </Grid>
          <Grid item xs={6}>
            <ProjectInfo />
          </Grid>
          <Grid item xs={12}>
            <Chart commits={commits.data.data} prs={pullRequests.data.data} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default Home;
