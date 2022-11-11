import { Paper, Typography } from '@mui/material';
import { PullRequests } from '../../../interfaces/GithubData';
import Title from './Title';
export default function TotalPullRequests({ prs }: { prs: PullRequests }): JSX.Element {
    return (
        <Paper
            className="paper"
            sx={{
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