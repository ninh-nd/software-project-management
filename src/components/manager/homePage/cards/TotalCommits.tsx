import { Typography } from "@mui/material";
import { Commits } from "~/interfaces/Entity";
import Title from "~/components/common/styledComponents/Title";
import InfoPaper from "../../common/styledComponents/InfoPaper";
export default function TotalCommits({
  commits,
}: {
  commits: Commits | null | undefined;
}) {
  return (
    <InfoPaper>
      <Title>Total commits</Title>
      <Typography component="p" variant="h4">
        {commits?.total ?? 0}
      </Typography>
    </InfoPaper>
  );
}
