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
import TaskInfo from "./TaskInfo";
import VulnerabilityPage from "./VulnerabilityPage";
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
            <Route path="phases" element={<PhaseInfo />} />
            <Route path="tasks" element={<TaskInfo />} />
            <Route path="tickets" element={<TicketPage />} />
            <Route path="memberInfo" element={<MemberInfo />} />
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
