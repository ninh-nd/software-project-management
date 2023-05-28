import styled from "@emotion/styled";
import { Schedule } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SxProps,
  Theme,
  Typography,
  linearProgressClasses,
  useTheme,
} from "@mui/material";
const BorderLinearProgress = styled(LinearProgress)(
  ({ theme }: { theme: Theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "primary.main",
    },
  })
);
export default function PhaseProgress({ sx }: { sx?: SxProps }) {
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
            <BorderLinearProgress
              theme={theme}
              variant="determinate"
              value={50}
            />
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
