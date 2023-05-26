import { Typography } from "@mui/material";
import Title from "~/components/Title";
import InfoPaper from "~/components/InfoPaper";

interface Props {
  total: number;
}
export default function TotalThreats({ total }: Props) {
  return (
    <InfoPaper>
      <Title>Total discovered threats</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </InfoPaper>
  );
}
