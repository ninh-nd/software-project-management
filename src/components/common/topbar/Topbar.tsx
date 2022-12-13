import { Logout, Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, Tooltip, Box, AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { logout } from '~/actions/accountAction';
import { useThemeActions, useThemeHook } from '~/hooks/theme';
import '~/styles/style.scss';
const Topbar = (): JSX.Element => {
  const theme = useThemeHook();
  const { setTheme } = useThemeActions();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    logout();
    const cookies = new Cookies();
    cookies.remove('sid', { path: '/' });
    navigate('/login', { replace: true });
  }
  const changeTheme = () => {
    if (theme.palette.mode === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  return (
    <AppBar className="topbar">
      <Box className="topbarWrapper">
        <Box className="topLeft">
          <span className="logo">Dashboard</span>
        </Box>
        <Box className="topRight">
          <Tooltip title={theme.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}>
            <IconButton onClick={changeTheme}>
              {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogOut}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </AppBar>
  );
}
export default Topbar;