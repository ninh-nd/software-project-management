import {
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { getProjectInfo } from "~/actions/projectAction";
import InfoPaper from "../InfoPaper";
export default function ProjectInfo() {
  const { enqueueSnackbar } = useSnackbar();
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
  if (projectInfo === null) {
    enqueueSnackbar(projectInfoQuery.data?.message, { variant: "error" });
    return <></>;
  }
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
