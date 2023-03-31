import { Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ActivityHistoryCard from "~/components/memberInfo/ActivityHistoryCard";
import MemberInfoCard from "~/components/memberInfo/MemberInfoCard";
import TaskCard from "~/components/memberInfo/TaskCard";
import { useMemberQuery } from "~/hooks/query";

export default function MemberDetailInfo() {
  const { memberId } = useParams();
  if (!memberId) return <></>;
  const memberQuery = useMemberQuery(memberId);
  const member = memberQuery.data?.data;
  if (!member) return <></>;
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item xs={12} md={2}>
        <MemberInfoCard member={member} />
      </Grid>
      <Grid item xs={12} md={10}>
        <Stack spacing={3}>
          <ActivityHistoryCard member={member} />
          <TaskCard member={member} />
        </Stack>
      </Grid>
    </Grid>
  );
}
