import { Typography } from "@mui/material";
import Title from "~/components/common/styledComponents/Title";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";

interface Props {
  total: number;
}
export default function TotalVulnerabilities({ total }: Props) {
  return (
    <InfoPaper>
      <Title>Total discovered vulnerabilities</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </InfoPaper>
  );
}
