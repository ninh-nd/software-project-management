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
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { useCustomTheme } from "~/hooks/theme";
import { ActivityHistory } from "~/interfaces/Entity";
function reshapeActHistToRecharts(activityHistory: ActivityHistory[]) {
  // Turn activity history into a format that can be used by Recharts: An array of object with shape: {createdBy: string, totalCommits: number, totalPrs: number}
  const reshaped: {
    createdBy: string;
    totalCommits: number;
    totalPrs: number;
  }[] = [];
  activityHistory.forEach((x) => {
    const existing = reshaped.find((y) => y.createdBy === x.createdBy);
    if (existing) {
      if (x.action === "commit") existing.totalCommits += 1;
      else if (x.action === "pr") existing.totalPrs += 1;
    } else {
      const newEntry = {
        createdBy: x.createdBy,
        totalCommits: x.action === "commit" ? 1 : 0,
        totalPrs: x.action === "pr" ? 1 : 0,
      };
      reshaped.push(newEntry);
    }
  });
  return reshaped;
}
export default function Chart({
  activityHistory,
}: {
  activityHistory: ActivityHistory[];
}) {
  const reshapedActHist = reshapeActHistToRecharts(activityHistory);
  const theme = useCustomTheme();
  const lessThanMedium = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <InfoPaper>
      <Title>Activity history</Title>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart width={500} height={300} data={reshapedActHist}>
          <CartesianGrid strokeDasharray="3 3" />{" "}
          <XAxis dataKey="createdBy" hide={lessThanMedium} />
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
