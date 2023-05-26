import { AccountCircle } from "@mui/icons-material";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import InfoPaper from "~/components/InfoPaper";
import Title from "~/components/Title";
import { useMembersQuery } from "~/hooks/query";
export default function MemberCard() {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const memberListQuery = useMembersQuery(currentProject);
  const memberList = memberListQuery.data?.data ?? [];
  return (
    <InfoPaper>
      <Title>Members</Title>
      <TableContainer>
        <Table>
          <TableBody>
            {memberList.map((member, index) => (
              <TableRow key={index}>
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
