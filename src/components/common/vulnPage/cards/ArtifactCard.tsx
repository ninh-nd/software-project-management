import {
  BugReport,
  Code,
  ContentPaste,
  GridView,
  LibraryBooks,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Artifact, Threat, Vulnerability } from "~/interfaces/Entity";
import InfoPaper from "../../styledComponents/InfoPaper";
import Title from "../../styledComponents/Title";
import { useState } from "react";
interface VulnTabPanelProps {
  list: Vulnerability[];
  value: number;
  index: number;
}
interface ThreatTabPanelProps {
  list: Threat[];
  value: number;
  index: number;
}
function VulnTabPanel(props: VulnTabPanelProps) {
  const { list, value, index } = props;
  if (value !== index) return <></>;
  return (
    <List sx={{ overflowY: "scroll", height: "80%" }} dense>
      {list.map((item) => (
        <ListItem key={item._id}>
          <ListItemIcon>
            <BugReport />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">{item.cveId}</Typography>}
            secondary={
              <>
                <Typography variant="body2">
                  <b>Description:</b> {item.description}
                </Typography>
                <Typography variant="body2">
                  <b>Score:</b> {item.score}
                </Typography>
                <Typography variant="body2">
                  <b>Severity:</b> {item.severity}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
function ThreatTabPanel(props: ThreatTabPanelProps) {
  const { list, value, index } = props;
  if (value !== index) return <></>;
  return (
    <List sx={{ overflowY: "scroll", height: "80%" }} dense>
      {list.map((item) => (
        <ListItem key={item._id}>
          <ListItemIcon>
            <BugReport />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">{item.name}</Typography>}
            secondary={
              <>
                <Typography variant="body2">
                  <b>Description:</b> {item.description}
                </Typography>
                <Typography variant="body2">
                  <b>Score:</b> {item.score.total}
                </Typography>
                <Typography variant="body2">
                  <b>Status:</b> {item.status}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
function renderType({
  type,
}: {
  type: "image" | "log" | "source code" | "executable" | "library";
}) {
  switch (type) {
    case "image":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Image</Typography>
          <SvgIcon>
            <path
              fill="currentColor"
              d="M21.81 10.25c-.06-.04-.56-.43-1.64-.43c-.28 0-.56.03-.84.08c-.21-1.4-1.38-2.11-1.43-2.14l-.29-.17l-.18.27c-.24.36-.43.77-.51 1.19c-.2.8-.08 1.56.33 2.21c-.49.28-1.29.35-1.46.35H2.62c-.34 0-.62.28-.62.63c0 1.15.18 2.3.58 3.38c.45 1.19 1.13 2.07 2 2.61c.98.6 2.59.94 4.42.94c.79 0 1.61-.07 2.42-.22c1.12-.2 2.2-.59 3.19-1.16A8.3 8.3 0 0 0 16.78 16c1.05-1.17 1.67-2.5 2.12-3.65h.19c1.14 0 1.85-.46 2.24-.85c.26-.24.45-.53.59-.87l.08-.24l-.19-.14m-17.96.99h1.76c.08 0 .16-.07.16-.16V9.5c0-.08-.07-.16-.16-.16H3.85c-.09 0-.16.07-.16.16v1.58c.01.09.07.16.16.16m2.43 0h1.76c.08 0 .16-.07.16-.16V9.5c0-.08-.07-.16-.16-.16H6.28c-.09 0-.16.07-.16.16v1.58c.01.09.07.16.16.16m2.47 0h1.75c.1 0 .17-.07.17-.16V9.5c0-.08-.06-.16-.17-.16H8.75c-.08 0-.15.07-.15.16v1.58c0 .09.06.16.15.16m2.44 0h1.77c.08 0 .15-.07.15-.16V9.5c0-.08-.06-.16-.15-.16h-1.77c-.08 0-.15.07-.15.16v1.58c0 .09.07.16.15.16M6.28 9h1.76c.08 0 .16-.09.16-.18V7.25c0-.09-.07-.16-.16-.16H6.28c-.09 0-.16.06-.16.16v1.57c.01.09.07.18.16.18m2.47 0h1.75c.1 0 .17-.09.17-.18V7.25c0-.09-.06-.16-.17-.16H8.75c-.08 0-.15.06-.15.16v1.57c0 .09.06.18.15.18m2.44 0h1.77c.08 0 .15-.09.15-.18V7.25c0-.09-.07-.16-.15-.16h-1.77c-.08 0-.15.06-.15.16v1.57c0 .09.07.18.15.18m0-2.28h1.77c.08 0 .15-.07.15-.16V5c0-.1-.07-.17-.15-.17h-1.77c-.08 0-.15.06-.15.17v1.56c0 .08.07.16.15.16m2.46 4.52h1.76c.09 0 .16-.07.16-.16V9.5c0-.08-.07-.16-.16-.16h-1.76c-.08 0-.15.07-.15.16v1.58c0 .09.07.16.15.16"
            />
          </SvgIcon>
        </Stack>
      );
    case "log":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Log</Typography>
          <ContentPaste />
        </Stack>
      );
    case "source code":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Source code</Typography>
          <Code />
        </Stack>
      );
    case "executable":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Executable</Typography>
          <GridView />
        </Stack>
      );
    case "library":
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2">Library</Typography>
          <LibraryBooks />
        </Stack>
      );
  }
}
export default function ArtifactCard({ artifacts }: { artifacts: Artifact[] }) {
  const [value, setValue] = useState(0);
  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }
  return (
    <InfoPaper>
      <Title>Artifact's vulnerabilities</Title>
      <Stack spacing={2}>
        {artifacts.map((artifact) => (
          <Box key={artifact._id}>
            <Box display="flex" sx={{ height: 200 }}>
              <Box
                flexGrow={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxWidth={200}
              >
                <Stack alignItems="center">
                  <Typography variant="h6" component="div">
                    {artifact.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {renderType(artifact)}
                  </Typography>
                </Stack>
              </Box>
              <Divider orientation="vertical" />
              <Box flexGrow={2} maxWidth={900}>
                <Tabs value={value} onChange={handleTabChange}>
                  <Tab label="Vulnerabilities" />
                  <Tab label="Threats" />
                </Tabs>
                <VulnTabPanel
                  value={value}
                  index={0}
                  list={artifact.vulnerabilityList}
                />
                <ThreatTabPanel
                  value={value}
                  index={1}
                  list={artifact.threatList}
                />
              </Box>
            </Box>
            <Divider variant="middle" sx={{ m: 2 }} />
          </Box>
        ))}
      </Stack>
    </InfoPaper>
  );
}