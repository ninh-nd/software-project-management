import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const DashboardLayout = lazy(() => import("~/layouts/DashboardLayout"));
const AccountInfo = lazy(() => import("./AccountInfo"));
const Home = lazy(() => import("./Home"));
const MemberDetailInfo = lazy(() => import("./MemberDetailInfo"));
const PhaseDetailInfo = lazy(() => import("./PhaseDetailInfo"));
const PhaseInfo = lazy(() => import("./PhaseInfo"));
const TicketDetailPage = lazy(() => import("./TicketDetailPage"));
const TicketPage = lazy(() => import("./TicketPage"));
const VulnerabilityPage = lazy(() => import("./VulnerabilityPage"));
const Login = lazy(() => import("./Login"));
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
          <Route
            element={
              <Suspense fallback={<></>}>
                <DashboardLayout />
              </Suspense>
            }
            path="/vulnerabilities"
          >
            <Route
              path=""
              element={
                <Suspense fallback={<></>}>
                  <VulnerabilityPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <Suspense fallback={<></>}>
                <DashboardLayout />
              </Suspense>
            }
            path="/:currentProject"
          >
            <Route
              path=""
              element={
                <Suspense fallback={<></>}>
                  <Home />
                </Suspense>
              }
            />
            <Route path="phases">
              <Route
                path=""
                element={
                  <Suspense fallback={<></>}>
                    <PhaseInfo />
                  </Suspense>
                }
              />
              <Route
                path=":phaseId"
                element={
                  <Suspense fallback={<></>}>
                    <PhaseDetailInfo />
                  </Suspense>
                }
              />
            </Route>
            <Route path="tickets">
              <Route
                path=""
                element={
                  <Suspense fallback={<></>}>
                    <TicketPage />
                  </Suspense>
                }
              />
              <Route
                path=":ticketId"
                element={
                  <Suspense fallback={<></>}>
                    <TicketDetailPage />
                  </Suspense>
                }
              />
            </Route>
            <Route path="memberInfo">
              <Route
                path=":memberId"
                element={
                  <Suspense fallback={<></>}>
                    <MemberDetailInfo />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<></>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<></>}>
                <DashboardLayout />
              </Suspense>
            }
            path="/user/:username"
          >
            <Route
              path=""
              element={
                <Suspense fallback={<></>}>
                  <AccountInfo />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
