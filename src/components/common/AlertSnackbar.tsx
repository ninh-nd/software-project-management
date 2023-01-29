import { Alert, Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  status: "success" | "error";
}
export default function AlertSnackbar({ open, onClose, status }: Props) {
  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={2000}>
      {status === "success" ? (
        <Alert severity="success">Operation was success</Alert>
      ) : (
        <Alert severity="error">An error occured</Alert>
      )}
    </Snackbar>
  );
}
