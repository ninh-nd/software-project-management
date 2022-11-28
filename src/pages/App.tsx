import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Home from "./home/Home";
import Login from "./login/Login";
import MemberInfo from "./member/MemberInfo";
import PhaseInfo from "./phaseInfo/PhaseInfo";
import TaskInfo from "./tasks/TaskInfo";

export default function App() {
    return (
        <Routes>
            <Route element={<DashboardLayout />} path="/:projectName">
                <Route path='' element={<Home />} />
                <Route path='phases' element={<PhaseInfo />} />
                <Route path='tasks' element={<TaskInfo />} />
                <Route path='memberInfo' element={<MemberInfo />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}