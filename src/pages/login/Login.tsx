import React from 'react';
import {
  Box, Button, Checkbox, Grid, Link,
  Container, createTheme, CssBaseline, ThemeProvider,
  Avatar, Typography, TextField, FormControlLabel,
} from '@mui/material';
import { redirect } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '~/actions/accountAction';
import { getProjectOwn } from '~/actions/projectManagerAction';
import useProjectStore from '~/store/useStore';
const theme = createTheme();
const Login = (): JSX.Element => {
  const [errorText, setErrorText] = React.useState('');
  const setCurrentProject = useProjectStore(state => state.setCurrentProject);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Send data to backend for validation
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const response = await login(username, password);
    if (response.data.status === 'error') {
      setErrorText('Invalid username or password');
    } else {
      const { role, username, id, accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      const getProjectList = await getProjectOwn(id);
      const currentProject = getProjectList.data.projects[0].name;
      setErrorText('');
      setCurrentProject(currentProject);
      return redirect(`/${currentProject}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus helperText={errorText} />
            <TextField margin="normal" type="password" required fullWidth id="password" label="Password" name="password" autoFocus />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpwd" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div />
      </Container>
    </ThemeProvider>
  );
}
export default Login;