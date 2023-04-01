import { DataGrid } from "@mui/x-data-grid";
import { IUser } from "~/interfaces/User";
import Title from "../common/Title";
import InfoPaper from "../home/InfoPaper";

export default function ActivityHistoryCard({ member }: { member: IUser }) {
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
