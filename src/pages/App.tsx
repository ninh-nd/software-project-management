import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Suspense, lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { IErrorResponse, ISuccessResponse } from "~/interfaces/ServerResponse";
const AdminLayout = lazy(() => import("~/layouts/AdminLayout"));
const DashboardLayout = lazy(() => import("~/layouts/DashboardLayout"));
const AccountInfo = lazy(() => import("./Account"));
const AdminAccountManagement = lazy(() => import("./AdminAccountManagement"));
const AdminThirdPartyManagement = lazy(
  () => import("./AdminThirdPartyManagement")
);
const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const MemberDetailInfo = lazy(() => import("./MemberDetail"));
const PhaseDetailInfo = lazy(() => import("./PhaseDetail"));
const PhaseInfo = lazy(() => import("./Phase"));
const SignUpPage = lazy(() => import("./SignUp"));
const TicketDetailPage = lazy(() => import("./TicketDetail"));
const TicketPage = lazy(() => import("./Ticket"));
const VulnerabilityPage = lazy(() => import("./Vulnerability"));
function GlobalSuspense({ element }: { element: JSX.Element }) {
  return <Suspense fallback={<></>}>{element}</Suspense>;
}
const managerRoutes = {
  path: "/:currentProject",
  element: <GlobalSuspense element={<DashboardLayout />} />,
  children: [
    {
      path: "",
      element: <GlobalSuspense element={<Home />} />,
    },
    {
      path: "vulnerabilities",
      element: <GlobalSuspense element={<VulnerabilityPage />} />,
    },
    {
      path: "phases",
      children: [
        {
          path: "",
          element: <GlobalSuspense element={<PhaseInfo />} />,
        },
        {
          path: ":phaseId",
          element: <GlobalSuspense element={<PhaseDetailInfo />} />,
        },
      ],
    },
    {
      path: "tickets",
      children: [
        {
          path: "",
          element: <GlobalSuspense element={<TicketPage />} />,
        },
        {
          path: ":ticketId",
          element: <GlobalSuspense element={<TicketDetailPage />} />,
        },
      ],
    },
    {
      path: "memberInfo",
      children: [
        {
          path: ":memberId",
          element: <GlobalSuspense element={<MemberDetailInfo />} />,
        },
      ],
    },
  ],
};
const adminRoutes = {
  path: "/admin",
  element: <GlobalSuspense element={<AdminLayout />} />,
  children: [
    {
      path: "accounts",
      element: <GlobalSuspense element={<AdminAccountManagement />} />,
    },
    {
      path: "third-parties",
      element: <GlobalSuspense element={<AdminThirdPartyManagement />} />,
    },
  ],
};
const router = createBrowserRouter([
  adminRoutes,
  managerRoutes,
  {
    path: "/signup",
    element: <GlobalSuspense element={<SignUpPage />} />,
  },
  {
    path: "/login",
    element: <GlobalSuspense element={<Login />} />,
  },
  {
    path: "/user/:username",
    element: <GlobalSuspense element={<DashboardLayout />} />,
    children: [
      {
        path: "",
        element: <GlobalSuspense element={<AccountInfo />} />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
