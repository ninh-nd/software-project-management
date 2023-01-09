import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route } from "react-router-dom"
import DashboardLayout from "~/layouts/DashboardLayout"
import AccountInfo from "./account/AccountInfo"
import Home from "./home/Home"
import Login from "./login/Login"
import MemberInfo from "./member/MemberInfo"
import PhaseInfo from "./phaseInfo/PhaseInfo"
import TaskInfo from "./tasks/TaskInfo"
import VulnerabilityPage from "./vulnerabilities/VulnerabilityPage"
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
})
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route element={<DashboardLayout />} path="/vulnerabilities">
                    <Route path='' element={<VulnerabilityPage />} />
                </Route>
                <Route element={<DashboardLayout />} path="/:currentProject">
                    <Route path='' element={<Home />} />
                    <Route path='phases' element={<PhaseInfo />} />
                    <Route path='tasks' element={<TaskInfo />} />
                    <Route path='memberInfo' element={<MemberInfo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route element={<DashboardLayout />} path="/user/:username">
                    <Route path='' element={<AccountInfo />} />
                </Route>
            </Routes>
        </QueryClientProvider>
    )
}