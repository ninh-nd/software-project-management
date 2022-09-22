import React from 'react';
import Chart from '../../components/home/chart/Chart';
import FeaturedInfo from '../../components/home/featuredInfo/FeaturedInfo';
import { getCommits, getPullRequests } from '../../actions/activityHistoryAction';
import useStore from '../../store/useStore';
import { Commits, PullRequests } from '../../interfaces/GithubData';
const Home = (): JSX.Element => {
  const currentProject = useStore(state => state.currentProject);
  const fetch = useStore(state => state.fetch);
  React.useEffect(() => {
    fetch();
  }, []);
  const [commits, setCommits] = React.useState<Commits>({
    total: 0,
    contribution: []
  });
  const [prs, setPRs] = React.useState<PullRequests>({
    total: 0,
    contribution: []
  });
  React.useEffect(() => {
    async function fetchData() {
      const res = await getCommits(currentProject);
      const commits = res.data;
      const res2 = await getPullRequests(currentProject);
      const prs = res2.data;
      setCommits(commits);
      setPRs(prs);
    }
    fetchData();
  }, [])
  return (
    <div style={{ flex: 4 }}>
      <FeaturedInfo commits={commits} prs={prs} />
      <Chart commits={commits} prs={prs} />
    </div >
  );
}
export default Home;
