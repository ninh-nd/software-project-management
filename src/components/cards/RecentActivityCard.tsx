import { Commit } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { PullRequest } from "~/icons/Icons";
import { ActivityHistory } from "~/hooks/fetching/history";
export default function RecentActivity({
  activityHistory,
  sx,
}: {
  activityHistory: ActivityHistory[] | null | undefined;
  sx?: SxProps;
}) {
  if (!activityHistory) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardHeader title="Activity timeline" />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography color="error" variant="h6" align="center">
              No activity found! Have you linked your Github/Gitlab account?
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  const lastRecentAct = activityHistory
    .sort((a, b) => {
      const dateB = new Date(b.createdAt);
      const dateA = new Date(a.createdAt);
      return dateB.valueOf() - dateA.valueOf();
    })
    .slice(0, 5);
  return (
    <Card sx={sx}>
      <CardHeader title="Recent activity" />
      <CardContent>
        <List>
          {lastRecentAct.map((act) => (
            <ListItem key={act._id}>
              <ListItemIcon>
                {act.action === "commit" ? <Commit /> : <PullRequest />}
              </ListItemIcon>
              <ListItemText
                primary={act.content}
                secondary={`Created: ${dayjs(act.createdAt).format(
                  "DD/MM/YYYY"
                )}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
