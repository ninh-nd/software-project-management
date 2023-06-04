import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { Account } from "~/hooks/fetching/account";
import RoleChip from "../styled-components/RoleChip";
import AvatarImage from "/avatar.webp";
import { useUserByAccountIdQuery } from "~/hooks/fetching/user/query";
export default function AccountProfile({ account }: { account: Account }) {
  const memberByAccountIdInfo = useUserByAccountIdQuery();
  const memberInfo = memberByAccountIdInfo.data?.data;
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
          <Typography gutterBottom variant="h5" align="center">
            Hello, {memberInfo?.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <RoleChip role={account.role} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
