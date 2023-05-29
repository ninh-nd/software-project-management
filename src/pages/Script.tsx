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
  debounce,
} from "@mui/material";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommitScriptChange from "~/components/CommitScriptChange";
import { useGetWorkflowsQuery, useProjectInfoQuery } from "~/hooks/query";
import { Workflow } from "~/interfaces/Entity";
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
  const [selectedWorkFlow, setSelectedWorkflow] = useState<
    Workflow | undefined
  >();
  const workflows = workflowQuery.data?.data;
  useEffect(() => {
    if (workflows) {
      setSelectedWorkflow(workflows[0]);
    }
  }, [workflows]);
  if (!workflows || !selectedWorkFlow) return <></>;
  if (workflows.length === 0) return <NoWorkflow />;
  function setContent(value: string) {
    debounce(() => {
      setSelectedWorkflow((workflow) => {
        if (!workflow) return;
        return {
          ...workflow,
          content: value,
        };
      });
    }, 500);
  }
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
                <Select value={selectedWorkFlow.name}>
                  {workflows.map((workflow) => (
                    <MenuItem key={workflow.name} value={workflow.name}>
                      {workflow.name}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
            <CardContent sx={{ height: 550 }}>
              <CodeMirror
                value={selectedWorkFlow.content}
                onChange={setContent}
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
        workflow={selectedWorkFlow}
      />
    </Box>
  );
}
