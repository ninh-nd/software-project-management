import { Assignment } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";

export default function CompletedTaskCount({
  count,
  total,
  sx,
}: {
  count: number;
  total: number;
  sx?: SxProps;
}) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Completed tasks
            </Typography>
            <Typography variant="h4">{`${count} / ${total}`}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <Assignment />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
