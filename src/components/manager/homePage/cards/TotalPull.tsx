import { Typography } from "@mui/material";
import { PullRequests } from "~/interfaces/Entity";
import Title from "~/components/common/styledComponents/Title";
import InfoPaper from "../../common/styledComponents/InfoPaper";
export default function TotalPullRequests({
  prs,
}: {
  prs: PullRequests | null | undefined;
}) {
  return (
    <InfoPaper>
      <Title>Total pull requests</Title>
      <Typography component="p" variant="h4">
        {prs?.total ?? 0}
      </Typography>
    </InfoPaper>
  );
}
