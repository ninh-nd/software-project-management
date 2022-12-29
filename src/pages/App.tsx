import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, redirect } from "react-router-dom";
import AccountLayout from "~/layouts/AccountLayout";
import DashboardLayout from "~/layouts/DashboardLayout";
import Home from "./home/Home";
import Login from "./login/Login";
import MemberInfo from "./member/MemberInfo";
import PhaseInfo from "./phaseInfo/PhaseInfo";
import TaskInfo from "./tasks/TaskInfo";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route element={<DashboardLayout />} path="/:currentProject">
                    <Route path='' element={<Home />} />
                    <Route path='phases' element={<PhaseInfo />} />
                    <Route path='tasks' element={<TaskInfo />} />
                    <Route path='memberInfo' element={<MemberInfo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route element={<AccountLayout />} path="/user/:username">
                    <Route path='' element={<></>} />
                    <Route path='thirdParty' element={<></>} />
                </Route>
            </Routes>
        </QueryClientProvider>
    )
}