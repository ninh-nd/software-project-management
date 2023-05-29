import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CommitScriptChange from "~/components/CommitScriptChange";
import { useGetWorkflowsQuery, useProjectInfoQuery } from "~/hooks/query";
function NoWorkflow() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Toolbar />
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Workflow scripts</Typography>
          <Card sx={{ p: 2 }}>
            <CardContent
              sx={{
                height: 550,
              }}
            >
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography variant="h5">
                  Found no workflow in this project.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
export default function Script() {
  const { currentProject } = useParams();
  const [open, setOpen] = useState(false);
  const projectInfoQuery = useProjectInfoQuery(currentProject);
  const projectInfo = projectInfoQuery.data?.data;
  const workflowQuery = useGetWorkflowsQuery(projectInfo?.url);
  const workflows = workflowQuery.data?.data;
  const [workflow, setWorkflow] = useState(workflows?.[0]);
  if (workflows?.length === 0) return <NoWorkflow />;
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Toolbar />
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Workflow scripts</Typography>
          <Card sx={{ p: 2 }}>
            <CardHeader
              title="Editor"
              action={
                <Select value={workflow?.name}>
                  {workflows?.map((workflow) => (
                    <MenuItem key={workflow.name} value={workflow.name}>
                      {workflow.name}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
            <CardContent sx={{ height: 550 }}>
              <CodeMirror
                value={workflow?.content}
                extensions={[langs.yaml()]}
                height="500px"
              />
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button onClick={() => setOpen(true)}>Commit changes...</Button>
            </CardActions>
          </Card>
        </Stack>
      </Container>
      <CommitScriptChange
        open={open}
        setOpen={setOpen}
        fileName="integrate.yml"
        content="ddd"
      />
    </Box>
  );
}
