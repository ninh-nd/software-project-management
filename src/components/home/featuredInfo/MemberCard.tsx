import { AccountCircle } from "@mui/icons-material";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Link as RouterLink, useParams } from "react-router-dom";
import Title from "~/components/common/Title";
import { useMembersQuery } from "~/hooks/query";
import InfoPaper from "../InfoPaper";
export default function MemberCard() {
  const { enqueueSnackbar } = useSnackbar();
  const { currentProject } = useParams();
  if (currentProject === undefined) return <></>;
  const memberListQuery = useMembersQuery(currentProject);
  const memberList =
    memberListQuery.data === undefined ? [] : memberListQuery.data.data;
  if (memberList === null) {
    enqueueSnackbar(memberListQuery.data?.message, { variant: "error" });
    return <></>;
  }
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
