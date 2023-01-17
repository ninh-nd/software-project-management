import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ICommits, IPullRequests } from "~/interfaces/GithubData";
import Title from "~/components/common/Title";
import { Paper } from "@mui/material";
import InfoPaper from "../InfoPaper";
type ChartProps = {
  commits: ICommits;
  prs: IPullRequests;
};
const Chart = ({ commits, prs }: ChartProps): JSX.Element => {
  return (
    <InfoPaper>
      <Title>Activity history</Title>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart
          width={500}
          height={300}
          data={commits.contribution}
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
          data={prs.contribution}
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
