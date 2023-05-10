import { DataGrid } from "@mui/x-data-grid";
import { User } from "~/interfaces/Entity";
import Title from "../../../common/styledComponents/Title";
import InfoPaper from "../../../common/styledComponents/InfoPaper";

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
