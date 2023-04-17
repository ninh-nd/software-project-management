import { Typography } from "@mui/material";
import Title from "~/components/common/Title";
import InfoPaper from "~/components/home/InfoPaper";

interface Props {
  total: number;
}
export default function TotalVulnerabilities({ total }: Props) {
  return (
    <InfoPaper>
      <Title>Total vulnerabilities in the database</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </InfoPaper>
  );
}
