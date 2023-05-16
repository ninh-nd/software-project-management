import { ArrowBack } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useCWEQuery } from "~/hooks/query";
import { useCustomTheme } from "~/hooks/theme";
import { CWE } from "~/interfaces/Entity";

function renderEntry(entry: Array<any>) {
  if (entry.length === 0)
    return <Typography>There is no information on this section.</Typography>;
  return entry.map((item, index) => (
    <Typography key={index}>
      {index + 1}. {item}
    </Typography>
  ));
}

function Body({ cwe }: { cwe: CWE | null | undefined }) {
  const theme = useCustomTheme();
  if (cwe === undefined) return <></>;
  else if (cwe === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h4">
          This CWE data is not found in the database. Click the top left button
          to return.
        </Typography>
      </Box>
    );
  }
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">
          <b>CWE-{cwe.cweId}</b> - {cwe.name}
        </Typography>
        <Divider />
        <Typography variant="h6">Description</Typography>
        <Typography>{cwe.description}</Typography>
        <Divider />
        <Typography variant="h6">Modes of introduction</Typography>
        {renderEntry(cwe.modesOfIntroduction)}
        <Divider />
        <Typography variant="h6">Likelihood of exploit</Typography>
        <Typography
          color={
            cwe.likelihood === "High"
              ? theme.palette.error.main
              : cwe.likelihood === "Medium"
              ? theme.palette.warning.main
              : theme.palette.success.main
          }
        >
          {cwe.likelihood}
        </Typography>
        <Divider />
        <Typography variant="h6">Consequences</Typography>
        {renderEntry(cwe.consequences)}
        <Divider />
        <Typography variant="h6">Detection methods</Typography>
        {renderEntry(cwe.detectionMethods)}
        <Divider />
        <Typography variant="h6">Mitigation</Typography>
        {renderEntry(cwe.mitigation)}
      </Stack>
    </Container>
  );
}
export default function CWEDetails({
  setCloseDialog,
}: {
  setCloseDialog: () => void;
}) {
  const [searchParams] = useSearchParams();
  const cwe = searchParams.get("cwe");
  if (!cwe) {
    return <></>;
  }
  const cweQuery = useCWEQuery(cwe);
  const cweData = cweQuery.data?.data;
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
      <Body cwe={cweData} />
    </>
  );
}
