import { Add, BugReport, ExpandMore, Reviews } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import AddVulnResolutionDialog from "~/components/dialogs/AddVulnResolutionDialog";
import { Vulnerability } from "~/hooks/fetching/artifact";
import AvatarImage from "/avatar.webp";
import { Resolution } from "~/hooks/fetching/vuln";
dayjs.extend(relativeTime);
export default function VulnDetailsCard({
  vuln,
  resolution,
}: {
  vuln: Vulnerability;
  resolution?: Resolution;
}) {
  const [selectedCveId, setSelectedCveId] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  async function handleOpenDialog(cveId: string) {
    setSelectedCveId(cveId);
    setOpen(true);
  }
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <BugReport />
            <Typography display="inline" variant="h5" sx={{ ml: 1 }}>
              {vuln.cveId}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body1">
          <b>Description: </b>
          {vuln.description}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1">
          <b>Severity: </b>
          {vuln.severity}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1">
          <b>Score: </b>
          {vuln.score}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1">
          <b>CWEs: </b>
          {vuln.cwes.join(", ")}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            startIcon={<Add />}
            onClick={() => handleOpenDialog(vuln.cveId)}
          >
            Add resolution
          </Button>
          <Button
            startIcon={<Reviews />}
            endIcon={
              <ExpandMore
                sx={{
                  transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            }
            onClick={() => setExpanded(!expanded)}
          >
            View resolutions
          </Button>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {resolution ? (
            <List>
              {resolution.resolution.map((item) => (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src={AvatarImage}
                        sx={{
                          height: 40,
                          width: 40,
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.createdBy ?? "Unknown"}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          ) : (
            <Typography variant="body1">
              No resolution found for this vulnerability
            </Typography>
          )}
        </CardContent>
      </Collapse>
      <AddVulnResolutionDialog
        open={open}
        setOpen={setOpen}
        cveId={selectedCveId}
      />
    </Card>
  );
}
