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
export default function Script() {
  const { currentProject } = useParams();
  const [open, setOpen] = useState(false);
  const projectInfoQuery = useProjectInfoQuery(currentProject);
  const projectInfo = projectInfoQuery.data?.data;
  if (!projectInfo) return <></>;
  const workflowQuery = useGetWorkflowsQuery(projectInfo.url);
  const workflows = workflowQuery.data?.data ?? [];
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
                <Select value="1">
                  <MenuItem value="1">integrate.yml</MenuItem>
                  <MenuItem value="2">another.yml</MenuItem>
                </Select>
              }
            />
            <CardContent sx={{ height: 550 }}>
              <CodeMirror
                value="console.log('Hello World!');\nhello"
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
