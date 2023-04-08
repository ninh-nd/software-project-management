import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function FormItem({
  label,
  children,
}: {
  label: string;
  children?: JSX.Element | JSX.Element[];
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 1 }}
    >
      <Typography variant="h6">{label}</Typography>
      {children}
    </Box>
  );
}
