import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "~/layouts/AdminLayout";
import DashboardLayout from "~/layouts/DashboardLayout";
import AccountInfo from "./AccountInfo";
import AdminAccountManagement from "./AdminAccountManagement";
import AdminThirdPartyManagement from "./AdminThirdPartyManagement";
import Home from "./Home";
import Login from "./Login";
import MemberDetailInfo from "./MemberDetailInfo";
import PhaseDetailInfo from "./PhaseDetailInfo";
import PhaseInfo from "./PhaseInfo";
import SignUpPage from "./SignUpPage";
import TicketDetailPage from "./TicketDetailPage";
import TicketPage from "./TicketPage";
import VulnerabilityPage from "./VulnerabilityPage";
import { ISuccessResponse, IErrorResponse } from "~/interfaces/ServerResponse";
export default function App() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onSuccess: (data) => {
        const dataResponse = data as ISuccessResponse<any> | IErrorResponse;
        if (dataResponse.status === "error") {
          enqueueSnackbar(dataResponse.message, { variant: "error" });
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<DashboardLayout />} path="/:currentProject">
          <Route path="" element={<Home />} />
          <Route path="vulnerabilities" element={<VulnerabilityPage />} />
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />} path="/user/:username">
          <Route path="" element={<AccountInfo />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="accounts" element={<AdminAccountManagement />} />
          <Route path="third-parties" element={<AdminThirdPartyManagement />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </QueryClientProvider>
  );
}
