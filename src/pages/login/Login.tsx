import React from 'react';
import {
  Box, Button, Checkbox, Grid, Link,
  Container, createTheme, CssBaseline, ThemeProvider,
  Avatar, Typography, TextField, FormControlLabel,
} from '@mui/material';
import { redirect, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getAccountRole, login } from '~/actions/accountAction';
import { getProjectOwn } from '~/actions/projectManagerAction';
const theme = createTheme();
const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = React.useState('');
  const [error, setError] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Send data to backend for validation
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    let response;
    try {
      response = await login(username, password);
    } catch (error) {
      setErrorText('Invalid username or password');
      setError(true);
    }
    if (response?.status === 200) {
      setError(false);
      setErrorText('');
      const roleData = await getAccountRole(username);
      if (roleData.data.role === 'manager') {
        const { data: { projects } } = await getProjectOwn(roleData.data.id);
        const currentProject = projects[0].name;
        navigate(`/${currentProject}`);
      }
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
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus helperText={errorText} error />
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