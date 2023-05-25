import { Outlet } from "react-router-dom";
import Topbar from "~/components/common/topbar/Topbar";
import Sidebar from "~/components/manager/sidebar/Sidebar";
import MemberSidebar from "~/components/member/common/MemberSidebar";
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
    <>
      <Topbar />
      <SidebarWithRole />
      <Outlet />
    </>
  );
}
