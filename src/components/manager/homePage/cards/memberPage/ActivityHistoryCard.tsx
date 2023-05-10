import { DataGrid } from "@mui/x-data-grid";
import InfoPaper from "~/components/common/styledComponents/InfoPaper";
import Title from "~/components/common/styledComponents/Title";
import { User } from "~/interfaces/Entity";

export default function ActivityHistoryCard({ member }: { member: User }) {
  const activityHistoryColumns = [
    { field: "action", headerName: "Action", width: 200 },
    { field: "content", headerName: "Content", minWidth: 400, flex: 1 },
  ];
  return (
    <InfoPaper>
      <Title>Activity history</Title>
      <DataGrid
        getRowId={(row) => row._id}
        rows={member.activityHistory}
        columns={activityHistoryColumns}
        autoHeight
      />
    </InfoPaper>
  );
}
