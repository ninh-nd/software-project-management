import { Typography } from "@mui/material";
import Title from "~/components/common/Title";
import InfoPaper from "~/components/home/InfoPaper";

interface Props {
  total: number;
}
export default function TotalThreats({ total }: Props) {
  return (
    <InfoPaper>
      <Title>Total threats in the database</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
    </InfoPaper>
  );
}
