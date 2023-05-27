import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Suspense, lazy } from "react";
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { IErrorResponse, ISuccessResponse } from "~/interfaces/ServerResponse";
import MemberTaskAndIssue from "./MemberTaskAndIssue";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";
import { createTypography } from "~/theme/create-typography";
import { createShadows } from "~/theme/create-shadows";
import { createComponents } from "~/theme/create-components";
import { createPalette } from "~/theme/create-palette";
import NotFound from "./404";
const AdminLayout = lazy(() => import("~/layouts/AdminLayout"));
const DashboardLayout = lazy(() => import("~/layouts/DashboardLayout"));
const AccountInfo = lazy(() => import("./Account"));
const AdminAccountManagement = lazy(() => import("./AdminAccountManagement"));
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
const managerAndMemberRoutes: RouteObject = {
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
    {
      path: "tasksAndIssues",
      element: <GlobalSuspense element={<MemberTaskAndIssue />} />,
    },
  ],
};
const adminRoutes: RouteObject = {
  path: "/admin",
  element: <GlobalSuspense element={<AdminLayout />} />,
  children: [
    {
      path: "",
      element: <GlobalSuspense element={<AdminAccountManagement />} />,
    },
  ],
};
const router = createBrowserRouter([
  adminRoutes,
  managerAndMemberRoutes,
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
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);
export default function App() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();
  const theme = createTheme({
    typography,
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8,
    },
  });
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
      <SnackbarProvider autoHideDuration={4000} maxSnack={1}>
        <ThemeProvider theme={theme}>
          <Box display="flex">
            <CssBaseline />
            <RouterProvider router={router} />
          </Box>
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
