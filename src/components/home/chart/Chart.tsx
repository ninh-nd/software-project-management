import { useMediaQuery } from "@mui/material";
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
import { useThemeHook } from "~/hooks/theme";
import { ICommits, IPullRequests } from "~/interfaces/GithubData";
import InfoPaper from "../InfoPaper";
type ChartProps = {
  commits: ICommits;
  prs: IPullRequests;
};
function mergeContributions(commits: ICommits, prs: IPullRequests) {
  const merged = [];
  const contributions = commits.contribution.concat(prs.contribution);
  const authors = [...new Set(contributions.map((c) => c.author))];

  for (const author of authors) {
    const totalCommits =
      commits.contribution.find((c) => c.author === author)?.total || 0;
    const totalPrs =
      prs.contribution.find((c) => c.author === author)?.total || 0;
    merged.push({ author, totalCommits, totalPrs });
  }

  return merged;
}
export default function Chart({ commits, prs }: ChartProps) {
  const theme = useThemeHook();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down("md"));
  const merged = mergeContributions(commits, prs);
  return (
    <InfoPaper>
      <Title>Activity history</Title>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart width={500} height={300} data={merged}>
          <CartesianGrid strokeDasharray="3 3" />{" "}
          <XAxis dataKey="author" hide={lessThanMedium} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalCommits" fill="#8884d8" name="Number of commits" />
          <Bar
            dataKey="totalPrs"
            fill="#82ca9d"
            name="Number of pull requests"
          />
        </BarChart>
      </ResponsiveContainer>
    </InfoPaper>
  );
}
