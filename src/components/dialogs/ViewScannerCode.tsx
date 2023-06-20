import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useGetScanner } from "~/hooks/fetching/scanner/query";

export default function ViewScannerCode({
  open,
  setOpen,
  scannerId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  scannerId: string;
}) {
  const scannerQuery = useGetScanner(scannerId);
  const scanner = scannerQuery.data?.data;
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <DialogTitle>Scanner</DialogTitle>
      <Stack spacing={2} sx={{ p: 2 }}>
        <FormControl>
          <FormLabel>Install command</FormLabel>
          <TextField
            value={scanner?.config?.installCommand}
            fullWidth
            disabled
          />
        </FormControl>
        <FormControl>
          <FormLabel>Code</FormLabel>
          <ReactCodeMirror
            value={scanner?.config?.code}
            extensions={[langs.javascript()]}
            editable={false}
            width="800px"
            height="500px"
          />
        </FormControl>
      </Stack>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
