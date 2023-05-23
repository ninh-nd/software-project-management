import { Commit } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import dayjs from "dayjs";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { PullRequest } from "~/icons/Icons";
import { ActivityHistory } from "~/interfaces/Entity";
export default function RecentActivity({
  activityHistory,
}: {
  activityHistory: ActivityHistory[];
}) {
  const lastRecentAct = activityHistory
    .sort((a, b) => {
      const dateB = new Date(b.createdAt);
      const dateA = new Date(a.createdAt);
      return dateB.valueOf() - dateA.valueOf();
    })
    .slice(0, 5);
  return (
    <InfoPaper>
      <Title>Recent activity</Title>
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
    </InfoPaper>
  );
}
