import React from 'react';
import Sidebar from '../components/common/sidebar/Sidebar';
import Topbar from '../components/common/topbar/Topbar';
import Home from './home/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import PhaseInfo from './phaseInfo/PhaseInfo';
import TaskInfo from './tasks/TaskInfo';
import MemberInfo from './member/MemberInfo';
import useStore from '../store/useStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mui/material';
const queryClient = new QueryClient();
export default function DashboardLayout() {
    const currentProject = useStore(state => state.currentProject);
    const fetch = useStore(state => state.fetch);
    React.useEffect(() => {
        fetch();
    }, [currentProject]);
    return (
        <QueryClientProvider client={queryClient}>
            <Topbar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Navigate to={`/${currentProject}`} replace />} />
                    <Route path='/:projectName' element={<Home />} />
                    <Route path=':projectName/phases' element={<PhaseInfo />} />
                    <Route path='tasks' element={<TaskInfo />} />
                    <Route path=':projectName/memberInfo' element={<MemberInfo />} />
                </Routes>
            </Box>
        </QueryClientProvider>
    );
}