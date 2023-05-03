import { Box, Typography } from "@mui/material";
import Title from "~/components/common/Title";
import InfoPaper from "~/components/home/InfoPaper";
import { IVulnerability } from "~/interfaces/Entity";

interface Props {
  vulnList: IVulnerability[];
}
export default function SeverityStatistics({ vulnList }: Props) {
  const lowCount = vulnList.filter((vuln) => vuln.severity === "LOW").length;
  const mediumCount = vulnList.filter(
    (vuln) => vuln.severity === "MEDIUM"
  ).length;
  const highCount = vulnList.filter((vuln) => vuln.severity === "HIGH").length;
  return (
    <InfoPaper>
      <Title>Severity statistics</Title>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h6" color="green">
          Low: {lowCount}
        </Typography>
        <Typography variant="h6" color="orange">
          Medium: {mediumCount}
        </Typography>
        <Typography variant="h6" color="red">
          High: {highCount}
        </Typography>
      </Box>
    </InfoPaper>
  );
}
