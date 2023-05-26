import { Typography } from "@mui/material";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
export default function TotalPullRequests({ total }: { total: number }) {
  return (
    <InfoPaper>
      <Title>Total pull requests</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </InfoPaper>
  );
}