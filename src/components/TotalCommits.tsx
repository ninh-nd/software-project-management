import { Typography } from "@mui/material";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
export default function TotalCommits({ total }: { total: number }) {
  return (
    <InfoPaper>
      <Title>Total commits</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </InfoPaper>
  );
}
