import React from 'react';
import Sidebar from '~/components/common/sidebar/Sidebar';
import Topbar from '~/components/common/topbar/Topbar';
import { Outlet, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useProjectActions } from '~/hooks/projects';
import { useThemeHook } from '~/hooks/theme';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});
export default function DashboardLayout() {
    const { currentProject } = useParams();
    if (currentProject === undefined) {
        return <></>;
    }
    const { fetch } = useProjectActions();
    const theme = useThemeHook();
    React.useEffect(() => {
        fetch();
    }, [currentProject]);
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Topbar />
                <Box sx={{ display: 'flex', mt: '100px' }}>
                    <Sidebar />
                    <Outlet />
                </Box>
            </ThemeProvider>
        </QueryClientProvider>
    );
}