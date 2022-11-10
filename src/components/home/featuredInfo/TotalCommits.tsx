import { Paper, Typography } from '@mui/material';
import { Commits } from '../../../interfaces/GithubData';
import Title from './Title';
export default function TotalCommits({ commits }: { commits: Commits }): JSX.Element {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 120,
            }}
        >
            <Title>Total commits</Title>
            <Typography component="p" variant="h4">
                {commits.total}
            </Typography>
        </Paper>
    )
}