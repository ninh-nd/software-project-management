import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import FullScreenLoading from "~/components/layout-components/FullScreenLoading";
import { IErrorResponse, ISuccessResponse } from "~/interfaces/ServerResponse";
import { createComponents } from "~/theme/create-components";
import { createPalette } from "~/theme/create-palette";
import { createShadows } from "~/theme/create-shadows";
import { createTypography } from "~/theme/create-typography";
import NotFound from "./404";
import Script from "./Script";
const Task = lazy(() => import("./Task"));
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
  return <Suspense fallback={<FullScreenLoading />}>{element}</Suspense>;
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
      path: "tasks",
      element: <GlobalSuspense element={<Task />} />,
    },
    {
      path: "scripts",
      element: <GlobalSuspense element={<Script />} />,
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
        suspense: true,
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
    </LocalizationProvider>
  );
}
