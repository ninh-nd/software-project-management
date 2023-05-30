import { GitHub } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import RoleChip from "~/components/styled-components/RoleChip";
import { GitLab } from "~/icons/Icons";
import { ThirdParty, User } from "~/interfaces/Entity";
import AvatarImage from "/avatar.webp";
function DisplayBadge({ thirdPartyList }: { thirdPartyList: ThirdParty[] }) {
  return (
    <Box justifyContent="center" display="flex" sx={{ py: 1 }}>
      {thirdPartyList.map((t) => {
        if (t.name === "Github") return <GitHub />;
        if (t.name === "Gitlab") return <GitLab />;
      })}
    </Box>
  );
}

export default function MemberInfoCard({ member }: { member: User }) {
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
            {member.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <RoleChip role={member.account.role} />
          </Typography>
          <DisplayBadge thirdPartyList={member.account.thirdParty} />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Update info
        </Button>
      </CardActions>
    </Card>
  );
}
