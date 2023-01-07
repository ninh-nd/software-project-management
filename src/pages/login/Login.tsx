import React from 'react'
import {
  Box, Button, Checkbox, Grid, Link,
  Container, createTheme, CssBaseline, ThemeProvider,
  Avatar, Typography, TextField, FormControlLabel, Input,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { login } from '~/actions/accountAction'
import { getProjectOwn } from '~/actions/projectManagerAction'
import { useProjectActions } from '~/hooks/project'
import { useForm } from 'react-hook-form'
const theme = createTheme()
interface IFormInput {
  username: string
  password: string
}
const Login = (): JSX.Element => {
  const { handleSubmit, register } = useForm<IFormInput>()
  const { setCurrentProject } = useProjectActions()
  const navigate = useNavigate()
  const [errorText, setErrorText] = React.useState('')
  const [error, setError] = React.useState(false)
  const onSubmit = async (data: IFormInput) => {
    const { username, password } = data
    let response
    try {
      response = await login(username, password)
    } catch (error) {
      setErrorText('Invalid username or password')
      setError(true)
    }
    if (response?.status === 200) {
      setError(false)
      setErrorText('')
      const { data } = await getProjectOwn()
      const currentProject = data[0].name
      setCurrentProject(currentProject)
      navigate(`/${currentProject}/`)
    }
  }
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth {...register("username")} autoFocus helperText={errorText} error={error} label="Username" />
            <TextField margin="normal" type="password" required fullWidth {...register("password")} autoFocus label="Password" />
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
                  Don&apost have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default Login