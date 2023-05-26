import { useTheme } from "@mui/material";
import dayjs from "dayjs";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { ActivityHistory } from "~/interfaces/Entity";
function dateFormatter(date: string) {
  return dayjs(date).format("DD/MM/YY");
}

function countHistory(array: ActivityHistory[]) {
  const counts: any = {};

  array.forEach((obj) => {
    const formattedDate = dateFormatter(obj.createdAt);

    if (formattedDate in counts) {
      counts[formattedDate]++;
    } else {
      counts[formattedDate] = 1;
    }
  });

  const result = Object.entries(counts).map(([date, count]) => ({
    date,
    count,
  }));

  return result;
}
export default function TimelineChart({
  activityHistory,
}: {
  activityHistory: ActivityHistory[];
}) {
  const theme = useTheme();
  activityHistory.sort((a, b) => {
    return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
  });
  const count = countHistory(activityHistory);
  return (
    <InfoPaper>
      <Title>Activity timeline</Title>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <LineChart width={600} height={400} data={count}>
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            dataKey="count"
            type="monotone"
            stroke={theme.palette.primary.main}
            name="Number of activities"
          />
        </LineChart>
      </ResponsiveContainer>
    </InfoPaper>
  );
}
