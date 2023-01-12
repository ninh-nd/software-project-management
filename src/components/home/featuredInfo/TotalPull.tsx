import { Paper, Typography } from "@mui/material";
import { IPullRequests } from "~/interfaces/GithubData";
import Title from "~/components/common/Title";
export default function TotalPullRequests({
  prs,
}: {
  prs: IPullRequests;
}): JSX.Element {
  return (
    <Paper
      className="paper"
      sx={{
        height: 120,
      }}
    >
      <Title>Total pull requests</Title>
      <Typography component="p" variant="h4">
        {prs.total}
      </Typography>
    </Paper>
  );
}
