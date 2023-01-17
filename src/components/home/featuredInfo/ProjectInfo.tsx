import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Link,
} from "@mui/material";
import { Paper } from "@mui/material";
import { getProjectInfo } from "~/actions/projectAction";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import InfoPaper from "../InfoPaper";
const ProjectInfo = (): JSX.Element => {
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const projectInfoQuery = useQuery(["projectInfo", currentProject], () =>
    getProjectInfo(currentProject)
  );
  if (projectInfoQuery.isLoading) {
    return <Skeleton variant="rounded" className="paper" height={200} />;
  }
  const projectInfo =
    projectInfoQuery.data === undefined
      ? {
          name: "",
          url: "",
          status: "",
          createdAt: "",
          updatedAt: "",
          phaseList: [],
        }
      : projectInfoQuery.data.data;
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
};
export default ProjectInfo;
