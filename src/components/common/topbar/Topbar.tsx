import { Logout } from '@mui/icons-material';
import { IconButton, Tooltip, Box } from '@mui/material';
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
    <Box className="topbar">
      <Box className="topbarWrapper">
        <Box className="topLeft">
          <span className="logo">Dashboard</span>
        </Box>
        <Box className="topRight">
          <Tooltip title="Logout">
            <IconButton onClick={handleLogOut}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
export default Topbar;