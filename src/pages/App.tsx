import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "~/layouts/DashboardLayout";
import AdminLayout from "~/layouts/AdminLayout";
import VulnerabilityPage from "./VulnerabilityPage";
import Home from "./Home";
import PhaseInfo from "./PhaseInfo";
import PhaseDetailInfo from "./PhaseDetailInfo";
import TicketPage from "./TicketPage";
import TicketDetailPage from "./TicketDetailPage";
import MemberDetailInfo from "./MemberDetailInfo";
import Login from "./Login";
import AdminAccountManagement from "./AdminAccountManagement";
import AccountInfo from "./AccountInfo";
import AdminThirdPartyManagement from "./AdminThirdPartyManagement";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider autoHideDuration={2000}>
        <Routes>
          <Route element={<DashboardLayout />} path="/vulnerabilities">
            <Route path="" element={<VulnerabilityPage />} />
          </Route>
          <Route element={<DashboardLayout />} path="/:currentProject">
            <Route path="" element={<Home />} />
            <Route path="phases">
              <Route path="" element={<PhaseInfo />} />
              <Route path=":phaseId" element={<PhaseDetailInfo />} />
            </Route>
            <Route path="tickets">
              <Route path="" element={<TicketPage />} />
              <Route path=":ticketId" element={<TicketDetailPage />} />
            </Route>
            <Route path="memberInfo">
              <Route path=":memberId" element={<MemberDetailInfo />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />} path="/user/:username">
            <Route path="" element={<AccountInfo />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="accounts" element={<AdminAccountManagement />} />
            <Route
              path="third-parties"
              element={<AdminThirdPartyManagement />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
