import './chart.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Commits, PullRequests } from '../../../interfaces/GithubData';
type ChartProps = {
  commits: Commits;
  prs: PullRequests;
}
const Chart = ({ commits, prs }: ChartProps): JSX.Element => {
  return (
    <div className='chart'>
      <h3 className="chartTitle">Activity history</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart
          width={500}
          height={300}
          data={commits.contribution}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="author" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Number of commits" />
        </BarChart>
      </ResponsiveContainer>
    </div >
  )
}
export default Chart;
