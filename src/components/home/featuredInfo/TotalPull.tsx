import { Typography } from "@mui/material";
import { IPullRequests } from "~/interfaces/GithubData";
import Title from "~/components/common/Title";
import InfoPaper from "../InfoPaper";
export default function TotalPullRequests({ prs }: { prs: IPullRequests }) {
  return (
    <InfoPaper>
      <Title>Total pull requests</Title>
      <Typography component="p" variant="h4">
        {prs.total}
      </Typography>
    </InfoPaper>
  );
}
