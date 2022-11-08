import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Login from "./login/Login";

export default function App() {
    return (
        <Routes>
            <Route path="*" element={<DashboardLayout />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}