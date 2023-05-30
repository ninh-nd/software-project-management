import { Outlet } from "react-router-dom";
import MemberSidebar from "~/components/layout-components/MemberSidebar";
import QueryBoundaries from "~/components/layout-components/QueryBoundaries";
import Sidebar from "~/components/layout-components/Sidebar";
import Topbar from "~/components/layout-components/Topbar";
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
