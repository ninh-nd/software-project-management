import { Box, Container, Grid, Toolbar } from "@mui/material";
import { useParams } from "react-router-dom";
import MemberCard from "~/components/MemberCard";
import ProjectInfo from "~/components/ProjectInfo";
import TotalCommits from "~/components/TotalCommits";
import TotalPullRequests from "~/components/TotalPull";
import Chart from "~/components/Chart";
import RecentActivity from "~/components/RecentActivity";
import TimelineChart from "~/components/TimelineChart";
import TaskAssigned from "~/components/TaskAssigned";
import TicketAssigned from "~/components/TicketAssigned";
import { useUserRole } from "~/hooks/general";
import {
  useActivityHistoryOfUserQuery,
  useActivityHistoryQuery,
  useMemberByAccountIdQuery,
} from "~/hooks/query";
function ManagerHomePage() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const actHistQuery = useActivityHistoryQuery(currentProject);
  const actHist = actHistQuery.data?.data;
  if (!actHist) return <></>;
  const commits = actHist.filter((x) => x.action === "commit");
  const pullRequests = actHist.filter((x) => x.action === "pr");
  return (
    <Box sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
      <Toolbar />
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid container item spacing={2} xs={12} sm={12} md={6}>
            <Grid item xs={12} sm={6}>
              <TotalCommits total={commits.length} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TotalPullRequests total={pullRequests.length} />
            </Grid>
            <Grid item xs={12}>
              <MemberCard />
            </Grid>
          </Grid>
          <Grid container item spacing={2} xs={12} sm={12} md={6}>
            <Grid item xs={12}>
              <ProjectInfo />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Chart activityHistory={actHist} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
function MemberHomePage() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const actHistQuery = useActivityHistoryOfUserQuery(currentProject);
  const actHistData = actHistQuery.data?.data;
  const memberInfoQuery = useMemberByAccountIdQuery();
  const memberInfo = memberInfoQuery.data?.data;
  if (!memberInfo) return <></>;
  if (!actHistData) return <></>;
  const { taskAssigned, ticketAssigned } = memberInfo;
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Toolbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <RecentActivity activityHistory={actHistData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectInfo />
          </Grid>
          <Grid item xs={12}>
            <TimelineChart activityHistory={actHistData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TaskAssigned tasks={taskAssigned} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TicketAssigned tickets={ticketAssigned} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default function Home() {
  const role = useUserRole();
  if (role === "manager") return <ManagerHomePage />;
  else return <MemberHomePage />;
}
