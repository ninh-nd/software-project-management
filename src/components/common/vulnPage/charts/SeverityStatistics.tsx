import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { useCustomTheme } from "~/hooks/theme";
import { Vulnerability } from "~/interfaces/Entity";

interface Props {
  vulnList: Vulnerability[];
}
export default function SeverityStatistics({ vulnList }: Props) {
  const theme = useCustomTheme();
  const lowCount = vulnList.filter((vuln) => vuln.severity === "LOW").length;
  const mediumCount = vulnList.filter(
    (vuln) => vuln.severity === "MEDIUM"
  ).length;
  const highCount = vulnList.filter((vuln) => vuln.severity === "HIGH").length;
  const data = [
    { name: "Low severity", value: lowCount },
    { name: "Medium severity", value: mediumCount },
    { name: "High severity", value: highCount },
  ];
  return (
    <InfoPaper>
      <Title>Severity statistics</Title>
      <ResponsiveContainer width="100%" minHeight={300}>
        <PieChart>
          <Pie dataKey="value" nameKey="name" data={data}>
            <Cell fill={theme.palette.success.main} />
            <Cell fill={theme.palette.warning.main} />
            <Cell fill={theme.palette.error.main} />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </InfoPaper>
  );
}
