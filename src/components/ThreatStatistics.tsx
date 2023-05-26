import { Box, Typography, useTheme } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
import { Threat } from "~/interfaces/Entity";

export default function ThreatStatistics({
  threatList,
}: {
  threatList: Threat[];
}) {
  const theme = useTheme();
  const nonCount = threatList.filter(
    (t) => t.status === "Non mitigated"
  ).length;
  const partialCount = threatList.filter(
    (t) => t.status === "Partially mitigated"
  ).length;
  const fullCount = threatList.filter(
    (t) => t.status === "Fully mitigated"
  ).length;
  const data = [
    { name: "Non-mitigated threats", value: nonCount },
    { name: "Partially-mitigated threats", value: partialCount },
    { name: "Fully-mitigated threats", value: fullCount },
  ];
  return (
    <InfoPaper sx={{ height: "100%" }}>
      <Title>Threat statistics</Title>
      {threatList.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h6" color="textSecondary">
            There's nothing here...
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" minHeight={300}>
          <PieChart>
            <Pie dataKey="value" nameKey="name" data={data}>
              <Cell fill={theme.palette.error.main} />
              <Cell fill={theme.palette.warning.main} />
              <Cell fill={theme.palette.success.main} />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </InfoPaper>
  );
}
