import { Assignment } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
export default function OverdueTaskCard({
  sx,
  total,
}: {
  sx?: SxProps;
  total: number;
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
              Overdue tasks (Working feature)
            </Typography>
            <Typography variant="h4" color="error.main">
              {total}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
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
