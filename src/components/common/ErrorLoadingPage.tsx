import { Box, Typography } from "@mui/material";

export default function ErrorLoadingPage() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '1', height: '100vh' }}>
            <Typography variant="h4">Error loading component</Typography>
        </Box>
    )
}