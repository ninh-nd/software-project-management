import { ArrowBack, Build, Save } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Slide,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Threat } from "~/hooks/fetching/threat";
import { useThreatQuery } from "~/hooks/fetching/threat/query";
import { typeOptions } from "~/utils/threat-display";
function ScoreTable({ total, details }: Threat["score"]) {
  const {
    damage,
    reproducibility,
    exploitability,
    affectedUsers,
    discoverability,
  } = details;
  return (
    <Table component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Damage</TableCell>
          <TableCell>Reproducibility</TableCell>
          <TableCell>Exploitability</TableCell>
          <TableCell>Affected Users</TableCell>
          <TableCell>Discoverability</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableRow>
        <TableCell>{damage}</TableCell>
        <TableCell>{reproducibility}</TableCell>
        <TableCell>{exploitability}</TableCell>
        <TableCell>{affectedUsers}</TableCell>
        <TableCell>{discoverability}</TableCell>
        <TableCell>{total}</TableCell>
      </TableRow>
    </Table>
  );
}
function Body({ data }: { data: Threat | null | undefined }) {
  const [editMode, setEditMode] = useState(false);
  if (!data) return <></>;
  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }
  function saveChanges() {
    setEditMode((prev) => !prev);
  }
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h4">
            <b>{data.name}</b>
          </Typography>
          {editMode ? (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={saveChanges}
              color="success"
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Build />}
              onClick={toggleEditMode}
            >
              Edit
            </Button>
          )}
        </Box>
        <Divider />
        <Typography variant="h6">Description</Typography>
        <Typography>{data.description}</Typography>
        <Divider />
        <Typography variant="h6">Type of threat</Typography>
        <Typography>{`${data.type}: ${
          typeOptions.find((item) => item.name === data.type)?.description
        }`}</Typography>
        <Divider />
        <Typography variant="h6">Score</Typography>
        <ScoreTable details={data.score.details} total={data.score.total} />
        <Divider />
        <Typography variant="h6">Current status</Typography>
        <Typography>{data.status}</Typography>
        <Divider />
        <Typography variant="h6">Mitigation</Typography>
        <Typography>{data?.mitigation}</Typography>
      </Stack>
    </Container>
  );
}
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ThreatDetailsDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("threatId");
  if (!id) {
    return <></>;
  }
  const getThreatQuery = useThreatQuery(id);
  const threat = getThreatQuery.data?.data;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Body data={threat} />
    </Dialog>
  );
}
