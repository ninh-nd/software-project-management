import { Outlet } from "react-router-dom";
import MemberSidebar from "~/components/MemberSidebar";
import QueryBoundaries from "~/components/QueryBoundaries";
import Sidebar from "~/components/Sidebar";
import Topbar from "~/components/Topbar";
import { useUserRole } from "~/hooks/general";
function SidebarWithRole() {
  const role = useUserRole();
  switch (role) {
    case "manager":
      return <Sidebar />;
    case "member":
      return <MemberSidebar />;
    default:
      return <></>;
  }
}
export default function DashboardLayout() {
  return (
    <QueryBoundaries>
      <Topbar />
      <SidebarWithRole />
      <Outlet />
    </QueryBoundaries>
  );
}
