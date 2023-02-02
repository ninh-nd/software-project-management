import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "~/components/common/Title";
import { ICommits, IPullRequests } from "~/interfaces/GithubData";
import InfoPaper from "../InfoPaper";
type ChartProps = {
  commits: ICommits | undefined;
  prs: IPullRequests | undefined;
};
const Chart = ({ commits, prs }: ChartProps): JSX.Element => {
  return (
    <InfoPaper>
      <Title>Activity history</Title>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart
          width={500}
          height={300}
          data={commits === undefined ? [] : commits?.contribution}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="author" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Number of commits" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart
          width={500}
          height={300}
          data={prs === undefined ? [] : prs?.contribution}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="author" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" name="Number of pull requests" />
        </BarChart>
      </ResponsiveContainer>
    </InfoPaper>
  );
};
export default Chart;
