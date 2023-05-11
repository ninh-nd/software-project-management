import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import ActivityHistoryCard from "~/components/manager/homePage/cards/memberPage/ActivityHistoryCard";
import MemberInfoCard from "~/components/manager/homePage/cards/memberPage/MemberInfoCard";
import TaskCard from "~/components/manager/homePage/cards/memberPage/TaskCard";
import { useMemberQuery } from "~/hooks/query";

export default function MemberDetail() {
  const { memberId } = useParams();
  if (!memberId) return <></>;
  const memberQuery = useMemberQuery(memberId);
  const member = memberQuery.data?.data;
  if (!member) return <></>;
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid xs={12} md={2}>
        <MemberInfoCard member={member} />
      </Grid>
      <Grid xs={12} md={10}>
        <Stack spacing={3}>
          <ActivityHistoryCard member={member} />
          <TaskCard member={member} />
        </Stack>
      </Grid>
    </Grid>
  );
}
