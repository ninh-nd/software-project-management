import { Logout } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { logout } from '~/actions/accountAction';
import '~/styles/style.scss';
const Topbar = (): JSX.Element => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    logout();
    const cookies = new Cookies();
    cookies.remove('sid', { path: '/' });
    navigate('/login', { replace: true });
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Dashboard</span>
        </div>
        <div className="topRight">
          <Tooltip title="Logout">
            <IconButton onClick={handleLogOut}>
              <Logout />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
export default Topbar;