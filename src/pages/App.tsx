import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "~/layouts/DashboardLayout";
import AccountInfo from "./AccountInfo";
import Home from "./Home";
import TicketPage from "./TicketPage";
import Login from "./Login";
import MemberInfo from "./MemberInfo";
import PhaseInfo from "./PhaseInfo";
import VulnerabilityPage from "./VulnerabilityPage";
import PhaseDetailInfo from "./PhaseDetailInfo";
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
            <Route path="tickets" element={<TicketPage />} />
            <Route path="memberInfo">
              <Route path=":memberId" element={<MemberInfo />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />} path="/user/:username">
            <Route path="" element={<AccountInfo />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
