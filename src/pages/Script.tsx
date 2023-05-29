import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import CommitScriptChange from "~/components/CommitScriptChange";
export default function Script() {
  const [open, setOpen] = useState(false);
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
