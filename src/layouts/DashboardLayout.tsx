import { Outlet } from "react-router-dom";
import Topbar from "~/components/Topbar";
import Sidebar from "~/components/Sidebar";
import MemberSidebar from "~/components/MemberSidebar";
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
