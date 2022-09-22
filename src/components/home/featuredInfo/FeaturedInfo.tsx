import { Commits, PullRequests } from '../../../interfaces/GithubData';
import './featuredInfo.css'
type FeaturedInfoProps = {
  commits: Commits;
  prs: PullRequests;
}
const FeaturedInfo = ({ commits, prs }: FeaturedInfoProps): JSX.Element => {
  return (
    <div className='featured'>
      <div className="featuredItem">
        <span className="featuredTitle">Total commits</span>
        <div className="featuredValueContainer">
          <span className="featuredValue">{commits.total}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total pull requests</span>
        <div className="featuredValueContainer">
          <span className="featuredValue">{prs.total}</span>
        </div>
      </div>
    </div>
  )
}
export default FeaturedInfo;