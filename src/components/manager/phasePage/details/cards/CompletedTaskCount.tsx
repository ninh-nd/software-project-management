import { Typography } from "@mui/material";
import Title from "~/components/common/styledComponents/Title";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";

export default function CompletedTaskCount({
  count,
  total,
}: {
  count: number;
  total: number;
}) {
  return (
    <InfoPaper>
      <Title>Completed tasks</Title>
      <Typography component="p" variant="h4">
        {`${count} / ${total}`}
      </Typography>
    </InfoPaper>
  );
}
