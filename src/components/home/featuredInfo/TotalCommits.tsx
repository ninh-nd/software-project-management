import { Typography } from "@mui/material";
import { ICommits } from "~/interfaces/GithubData";
import Title from "~/components/common/Title";
import InfoPaper from "../InfoPaper";
export default function TotalCommits({
  commits,
}: {
  commits: ICommits | null | undefined;
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
