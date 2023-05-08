import { GitHub } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "~/hooks/query";
import { useCustomTheme } from "~/hooks/theme";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface IFormInput {
  username: string;
  password: string;
}
export default function Login() {
  const theme = useCustomTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();
  const loginMutation = useLoginMutation();
  function githubLogin() {
    window.open(`${API_BASE_URL}auth/github`, "_self");
  }
  async function onSubmit(data: IFormInput) {
    loginMutation.mutate(data);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              {...register("username", {
                required: "Username is required",
              })}
              autoFocus
              label="Username"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
              })}
              autoFocus
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                color: "white",
                backgroundColor: "#24292e",
                "&:hover": { backgroundColor: "#24292e" },
              }}
              endIcon={<GitHub />}
              onClick={githubLogin}
            >
              Sign In with Github
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpwd" variant="body2" underline="hover">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" underline="hover">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
