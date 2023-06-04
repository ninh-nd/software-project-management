import { Stack, Grid, Box, Toolbar, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import ActivityHistoryCard from "~/components/cards/ActivityHistoryCard";
import MemberInfoCard from "~/components/cards/MemberInfoCard";
import TaskCard from "~/components/cards/TaskCard";
import { useUserQuery } from "~/hooks/fetching/user/query";

export default function MemberDetail() {
  const { memberId } = useParams();
  if (!memberId) return <></>;
  const memberQuery = useUserQuery(memberId);
  const member = memberQuery.data?.data;
  if (!member) return <></>;
  return (
    <Box flexGrow={1} height="100vh">
      <Toolbar />
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Grid
          container
          spacing={3}
          sx={{ p: 2 }}
          alignItems="center"
          height="100%"
        >
          <Grid item xs={5}>
            <MemberInfoCard member={member} />
          </Grid>
          <Grid item xs={7}>
            <Stack spacing={3}>
              <ActivityHistoryCard member={member} />
              <TaskCard member={member} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
