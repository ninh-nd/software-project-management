import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  text: string;
  deleteFunction: () => void;
}
export default function ConfirmDeleteDialog({
  text,
  open,
  setOpen,
  deleteFunction,
}: Props) {
  function handleClose() {
    setOpen(false);
  }
  function confirmDelete() {
    setOpen(false);
    deleteFunction();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="info">
          No
        </Button>
        <Button onClick={confirmDelete} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
