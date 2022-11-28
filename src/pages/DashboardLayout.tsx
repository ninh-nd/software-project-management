import React from 'react';
import Sidebar from '~/components/common/sidebar/Sidebar';
import Topbar from '~/components/common/topbar/Topbar';
import { Outlet, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mui/material';
import { useProjectActions } from '~/hooks/hooks';
const queryClient = new QueryClient();
export default function DashboardLayout() {
    const { currentProject } = useParams();
    if (currentProject === undefined) {
        return <></>;
    }
    const { fetch } = useProjectActions();
    React.useEffect(() => {
        fetch();
    }, [currentProject]);
    return (
        <QueryClientProvider client={queryClient}>
            <Topbar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Outlet />
            </Box>
        </QueryClientProvider>
    );
}