import { AccountCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useMembersQuery } from "~/hooks/query";
export default function MemberCard({ sx }: { sx?: SxProps }) {
  const { currentProject } = useParams();
  if (!currentProject) return <></>;
  const memberListQuery = useMembersQuery(currentProject);
  const memberList = memberListQuery.data?.data ?? [];
  return (
    <Card sx={sx}>
      <CardHeader title="Members" />
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
