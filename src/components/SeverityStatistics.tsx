import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Vulnerability } from "~/interfaces/Entity";

interface Props {
  vulnList: Vulnerability[];
  sx?: SxProps;
}
export default function SeverityStatistics({ vulnList, sx }: Props) {
  const theme = useTheme();
  const negligibleCount = vulnList.filter(
    (vuln) => vuln.severity.toLowerCase() === "negligible"
  ).length;
  const lowCount = vulnList.filter(
    (vuln) => vuln.severity.toLowerCase() === "low"
  ).length;
  const mediumCount = vulnList.filter(
    (vuln) => vuln.severity.toLowerCase() === "medium"
  ).length;
  const highCount = vulnList.filter(
    (vuln) => vuln.severity.toLowerCase() === "high"
  ).length;
  const criticalCount = vulnList.filter(
    (vuln) => vuln.severity.toLowerCase() === "critical"
  ).length;
  const data = [
    { name: "Negligible severity", value: negligibleCount },
    { name: "Low severity", value: lowCount },
    { name: "Medium severity", value: mediumCount },
    { name: "High severity", value: highCount },
    { name: "Critical severity", value: criticalCount },
  ];
  return (
    <Card sx={sx}>
      <CardHeader title="Severity statistics" />
      <CardContent>
        {vulnList.length === 0 ? (
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
                <Cell />
                <Cell fill={theme.palette.success.main} />
                <Cell fill={theme.palette.warning.main} />
                <Cell fill={theme.palette.error.main} />
                <Cell fill={theme.palette.secondary.main} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
