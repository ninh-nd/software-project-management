import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import { useProjectInfoQuery } from "~/hooks/query";
export default function ProjectInfo() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const projectInfoQuery = useProjectInfoQuery(currentProject);
  const projectInfo = projectInfoQuery.data?.data;
  if (!projectInfo) return <></>;
  const createdAt = Intl.DateTimeFormat("en-Us", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(projectInfo.createdAt));
  const updatedAt = Intl.DateTimeFormat("en-Us", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(projectInfo.updatedAt));
  return (
    <InfoPaper>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Project Name
              </TableCell>
              <TableCell align="right">{projectInfo.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                URL
              </TableCell>
              <TableCell align="right">
                <Link href={projectInfo.url} target="_blank" rel="noopener">
                  {projectInfo.url}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Status
              </TableCell>
              <TableCell align="right">{projectInfo.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Created at
              </TableCell>
              <TableCell align="right">{createdAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Updated at
              </TableCell>
              <TableCell align="right">{updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </InfoPaper>
  );
}
