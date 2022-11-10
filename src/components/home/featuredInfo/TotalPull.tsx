import { Paper, Typography } from '@mui/material';
import { PullRequests } from '../../../interfaces/GithubData';
import Title from './Title';
export default function TotalPullRequests({ prs }: { prs: PullRequests }): JSX.Element {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 120,
            }}
        >
            <Title>Total pull requests</Title>
            <Typography component="p" variant="h4">
                {prs.total}
            </Typography>
        </Paper>
    )
}