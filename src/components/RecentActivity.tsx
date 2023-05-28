import { Commit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import dayjs from "dayjs";
import { PullRequest } from "~/icons/Icons";
import { ActivityHistory } from "~/interfaces/Entity";
export default function RecentActivity({
  activityHistory,
  sx,
}: {
  activityHistory: ActivityHistory[];
  sx?: SxProps;
}) {
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
