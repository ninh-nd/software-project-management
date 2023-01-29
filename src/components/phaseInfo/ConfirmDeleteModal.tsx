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
  children: string;
  deleteFunction: () => Promise<void>;
}
export default function ConfirmDeleteModal({
  children,
  open,
  setOpen,
  deleteFunction,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };
  const confirmDelete = async () => {
    setOpen(false);
    await deleteFunction();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
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
