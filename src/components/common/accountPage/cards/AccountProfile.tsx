import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Account } from "~/interfaces/Entity";
import RoleChip from "../../styledComponents/RoleChip";
import AvatarImage from "/avatar.webp";
export default function AccountProfile({ account }: { account: Account }) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={AvatarImage}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            Hello, {account.username}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <RoleChip role={account.role} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
