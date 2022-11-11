import { Paper, Typography } from '@mui/material';
import { Commits } from '~/interfaces/GithubData';
import Title from '~/components/common/Title';
import '~/styles/style.scss';
export default function TotalCommits({ commits }: { commits: Commits }): JSX.Element {
    return (
        <Paper
            className="paper"
            sx={{
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