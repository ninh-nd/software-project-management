import { ArrowBack } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useThreatQuery } from "~/hooks/query";
import { useCustomTheme } from "~/hooks/theme";
import { Threat } from "~/interfaces/Entity";
import { typeOptions } from "./displayInfo";
interface Props {
  id: string | undefined;
  setCloseDialog: () => void;
}
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
  const theme = useCustomTheme();
  if (!data) return <></>;
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">
          <b>{data.name}</b>
        </Typography>
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
export default function ThreatDetails({ id, setCloseDialog }: Props) {
  if (!id) return <></>;
  const getThreatQuery = useThreatQuery(id);
  const threat = getThreatQuery.data?.data;
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={setCloseDialog}
            aria-label="close"
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Body data={threat} />
    </>
  );
}
