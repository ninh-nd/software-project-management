import Chart from '../../components/home/chart/Chart';
import FeaturedInfo from '../../components/home/featuredInfo/FeaturedInfo';
import { getCommits, getPullRequests } from '../../actions/activityHistoryAction';
import useStore from '../../store/useStore';
import { Commits, PullRequests } from '../../interfaces/GithubData';
import { useQuery } from '@tanstack/react-query';
import ServerResponse from '../../interfaces/ServerResponse';
const Home = (): JSX.Element => {
  const currentProject = useStore(state => state.currentProject);
  const commits = useQuery<ServerResponse<Commits>>(['commits'], () => getCommits(currentProject));
  const pullRequests = useQuery<ServerResponse<PullRequests>>(['pullRequests'], () => getPullRequests(currentProject));
  if (commits.isLoading || pullRequests.isLoading) {
    return <div>Loading...</div>;
  }
  if (commits.isError || pullRequests.isError) {
    return <div>Error</div>;
  }
  return (
    <div style={{ flex: 4 }}>
      <FeaturedInfo commits={commits.data.data} prs={pullRequests.data.data} />
      <Chart commits={commits.data.data} prs={pullRequests.data.data} />
    </div>
  );
}
export default Home;
