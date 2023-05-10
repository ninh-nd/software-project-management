import { Typography } from "@mui/material";
import Title from "~/components/common/styledComponents/Title";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";

export default function ActiveTaskCount({
  count,
  total,
}: {
  count: number;
  total: number;
}) {
  return (
    <InfoPaper>
      <Title>Active tasks</Title>
      <Typography component="p" variant="h4">
        {`${count} / ${total}`}
      </Typography>
    </InfoPaper>
  );
}
