import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ActivityHistoryCard from "~/components/memberInfo/ActivityHistoryCard";
import MemberInfoCard from "~/components/memberInfo/MemberInfoCard";
import TaskCard from "~/components/memberInfo/TaskCard";
import { useMemberQuery } from "~/hooks/query";
import { IMember } from "~/interfaces/Member";

export default function MemberDetailInfo() {
  const { memberId } = useParams();
  if (!memberId) return <></>;
  const memberQuery = useMemberQuery(memberId);
  const member = memberQuery.data?.data;
  if (!member) return <></>;
  return (
    <Box flexGrow={1} height="100vh" sx={{ p: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <MemberInfoCard member={member} />
        </Grid>
        <Grid item xs={10}>
          <Stack spacing={3}>
            <ActivityHistoryCard member={member} />
            <TaskCard member={member} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
