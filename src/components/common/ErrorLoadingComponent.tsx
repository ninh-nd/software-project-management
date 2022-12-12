import { Box, Typography } from "@mui/material";

export default function ErrorLoadingComponent() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '1' }}>
            <Typography variant="h4">Error loading component</Typography>
        </Box>
    )
}