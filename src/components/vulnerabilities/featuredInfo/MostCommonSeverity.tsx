import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Title from "~/components/common/Title";
import InfoPaper from "~/components/home/InfoPaper";

interface Props {
  severity: "High" | "Medium" | "Low";
}
export default function MostCommonSeverity({ severity }: Props) {
  return (
    <InfoPaper>
      <Title>Most common severity</Title>
      <Typography component="p" variant="h4">
        <Box
          sx={{
            color:
              severity === "High"
                ? "error.main"
                : severity === "Medium"
                ? "warning.main"
                : "success.main",
          }}
        >
          {severity}
        </Box>
      </Typography>
    </InfoPaper>
  );
}
