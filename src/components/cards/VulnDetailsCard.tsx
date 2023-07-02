import {
  Add,
  BugReport,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  Reviews,
} from "@mui/icons-material";
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
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChangeEvent, useState } from "react";
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
      <ResolutionCollapse expanded={expanded} resolution={resolution} />
      <AddVulnResolutionDialog
        open={open}
        setOpen={setOpen}
        cveId={selectedCveId}
      />
    </Card>
  );
}
function ResolutionCollapse({
  expanded,
  resolution,
}: {
  expanded: boolean;
  resolution: Resolution | undefined;
}) {
  const pageSize = 3;
  const [page, setPage] = useState(1);
  function handlePageChange(event: ChangeEvent<unknown>, page: number) {
    setPage(page);
  }
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        {resolution ? (
          <List>
            {resolution.resolution
              .slice(page - 1, Math.ceil(pageSize / page))
              .map((item, index) => (
                <Box key={index}>
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
                </Box>
              ))}
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Pagination
                count={Math.ceil(resolution.resolution.length / pageSize)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </List>
        ) : (
          <Typography variant="body1">
            No resolution found for this vulnerability
          </Typography>
        )}
      </CardContent>
    </Collapse>
  );
}
