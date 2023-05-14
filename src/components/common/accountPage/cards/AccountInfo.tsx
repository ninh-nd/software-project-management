import { Accessibility, AccountCircle, Email } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { Account } from "~/interfaces/Entity";
export default function AccountInfo({ account }: { account: Account }) {
  return (
    <InfoPaper>
      <Title>Account's info</Title>
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Username" secondary={account.username} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Email" secondary={account.email} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Accessibility />
          </ListItemIcon>
          <ListItemText
            primary="Current role"
            secondary={
              account.role.charAt(0).toUpperCase() + account.role.slice(1)
            }
          />
        </ListItem>
      </List>
    </InfoPaper>
  );
}
