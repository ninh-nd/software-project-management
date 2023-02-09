import { Box, Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMemberById } from "~/actions/memberAction";
import ActivityHistoryCard from "~/components/memberInfo/ActivityHistoryCard";
import MemberInfoCard from "~/components/memberInfo/MemberInfoCard";
import TaskCard from "~/components/memberInfo/TaskCard";

export default function MemberDetailInfo() {
  const { memberId } = useParams();
  if (memberId === undefined) return <></>;
  const memberQuery = useQuery(["member", memberId], () =>
    getMemberById(memberId)
  );
  const member = memberQuery.data?.data;
  if (member === undefined) return <></>;

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
