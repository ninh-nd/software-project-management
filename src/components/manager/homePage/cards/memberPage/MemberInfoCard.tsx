import { GitHub } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ThirdParty, User } from "~/interfaces/Entity";

function displayBadge(thirdPartyList: ThirdParty[]) {
  return thirdPartyList.map((thirdParty, index) => {
    if (thirdParty.name === "Github") return <GitHub key={index} />;
  });
}

export default function MemberInfoCard({ member }: { member: User }) {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        component="img"
        sx={{
          height: "auto",
          maxWidth: "100%",
          borderRadius: "50%",
          mb: 2,
          ml: 10,
          mr: 10,
        }}
        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
        alt="avatar"
      />
      <Box>
        <Typography variant="h4">{member.name}</Typography>
        <Typography variant="h6">{member.account.username}</Typography>
      </Box>
      <Box>{displayBadge(member.account.thirdParty)}</Box>
    </Box>
  );
}
