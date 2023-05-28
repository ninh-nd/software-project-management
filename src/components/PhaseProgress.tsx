import { Schedule } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
export default function PhaseProgress({
  sx,
  value,
}: {
  sx?: SxProps;
  value: number;
}) {
  const theme = useTheme();
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
        >
          <Stack spacing={1} sx={{ flexGrow: 0.8 }}>
            <Typography color="text.secondary" variant="overline">
              Progress (Working feature)
            </Typography>
            <LinearProgress variant="determinate" value={value} />
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "info.main",
              height: 56,
              width: 56,
            }}
          >
            <Schedule />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
