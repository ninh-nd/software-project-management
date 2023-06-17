import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

export default function AddNewToolDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} maxWidth="lg">
      <DialogTitle>Add a new scanning tool</DialogTitle>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2} sx={{ p: 2, width: "70%" }}>
          <TextField label="Name" />
          <TextField label="Install command (Linux only)" />
          <FormControl>
            <FormLabel>Result type (JSON)</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="stdout"
                control={<Radio />}
                label="stdout"
              />
              <FormControlLabel value="file" control={<Radio />} label="File" />
            </RadioGroup>
          </FormControl>
          <TextField label="CLI execute command" />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={2} sx={{ p: 2 }}>
          <TextField
            label="Property containing the array of vulnerability objects"
            helperText="For example, the return JSON contains the array of vulnerability objects in attribute Result.Vulnerabilities"
          />
          <FormLabel>
            Mapping of properties (leave blank if not exist)
          </FormLabel>
          <TextField label="CVE-ID" required />
          <TextField label="Description" required />
          <TextField
            label="Score"
            helperText="Preferrably the latest cvss score version"
          />
          <TextField label="Severity" required />
          <TextField
            label="CWEs"
            helperText="The property that contains a list of CWE strings like ['CWE-123', 'CWE-456']"
          />
        </Stack>
      </Box>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          Cancel
        </Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
