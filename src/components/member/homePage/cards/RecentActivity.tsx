import { Commit } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { ActivityHistory } from "~/interfaces/Entity";
import * as dayjs from "dayjs";
function PullRequestIcon() {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
        <line x1="6" y1="9" x2="6" y2="21"></line>
      </svg>
    </SvgIcon>
  );
}
export default function RecentActivity({
  activityHistory,
}: {
  activityHistory: ActivityHistory[];
}) {
  const lastRecentAct = activityHistory
    .sort((a, b) => {
      const dateB = new Date(b.updatedAt);
      const dateA = new Date(a.updatedAt);
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
              {act.action === "commit" ? <Commit /> : <PullRequestIcon />}
            </ListItemIcon>
            <ListItemText
              primary={act.content}
              secondary={`Last updated: ${dayjs(act.updatedAt).format(
                "DD/MM/YYYY"
              )}`}
            />
          </ListItem>
        ))}
      </List>
    </InfoPaper>
  );
}
