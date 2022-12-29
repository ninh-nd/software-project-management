import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import AccountSidebar from "~/components/common/sidebar/AccountSidebar";
import Topbar from "~/components/common/topbar/Topbar";
import { useThemeHook } from "~/hooks/theme";

export default function AccountLayout() {
    const theme = useThemeHook();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Topbar />
            <Box sx={{ display: 'flex', mt: '100px' }}>
                <AccountSidebar />
                <Outlet />
            </Box>
        </ThemeProvider>
    )
}