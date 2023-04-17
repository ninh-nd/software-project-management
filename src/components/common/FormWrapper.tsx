import { CloseOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
  closeDialogFunction?: () => void;
}
export default function FormWrapper({
  title,
  children,
  closeDialogFunction,
}: FormWrapperProps) {
  return (
    <Stack>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={closeDialogFunction}>
          <CloseOutlined />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Divider variant="middle" />
      {children}
    </Stack>
  );
}
