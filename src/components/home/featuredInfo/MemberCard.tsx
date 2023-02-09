import { AccountCircle } from "@mui/icons-material";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMembersOfProject } from "~/actions/memberAction";
import Title from "~/components/common/Title";
import InfoPaper from "../InfoPaper";
import { Link as RouterLink } from "react-router-dom";
export default function MemberCard() {
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const memberListQuery = useQuery(["memberList", currentProject], () =>
    getMembersOfProject(currentProject)
  );
  const memberList =
    memberListQuery.data === undefined ? [] : memberListQuery.data.data;
  return (
    <InfoPaper>
      <Title>Members</Title>
      <TableContainer>
        <Table>
          <TableBody>
            {memberList.map((member) => (
              <TableRow>
                <TableCell>
                  <AccountCircle sx={{ mr: 2 }} />
                  <Link
                    component={RouterLink}
                    to={`memberInfo/${member._id}`}
                    underline="hover"
                  >
                    {`${member.account.username} (${member.name})`}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfoPaper>
  );
}
