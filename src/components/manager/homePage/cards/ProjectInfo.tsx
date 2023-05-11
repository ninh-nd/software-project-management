import {
  Avatar,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import { useProjectInfoQuery } from "~/hooks/query";
import * as dayjs from "dayjs";
import {
  Abc,
  AccessTime,
  Link as LinkIcon,
  PowerSettingsNew,
} from "@mui/icons-material";
export default function ProjectInfo() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const projectInfoQuery = useProjectInfoQuery(currentProject);
  const projectInfo = projectInfoQuery.data?.data;
  if (!projectInfo) return <></>;
  const createdAt = dayjs(projectInfo.createdAt).format("DD/MM/YYYY");
  const updatedAt = dayjs(projectInfo.updatedAt).format("DD/MM/YYYY");
  return (
    <InfoPaper>
      <List>
        <ListItem>
          <ListItemIcon>
            <Abc />
          </ListItemIcon>
          <ListItemText primary="Project name" secondary={projectInfo.name} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText
            primary="URL"
            secondary={
              <Link href={projectInfo.url} target="_blank" rel="noopener">
                {projectInfo.url}
              </Link>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText primary="Status" secondary={projectInfo.status} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccessTime />
          </ListItemIcon>
          <ListItemText primary="Created at" secondary={createdAt} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccessTime />
          </ListItemIcon>
          <ListItemText primary="Updated at" secondary={updatedAt} />
        </ListItem>
      </List>
    </InfoPaper>
  );
}
