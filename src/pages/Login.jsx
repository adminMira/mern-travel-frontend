import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";
const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://www.tourdom.ru/hotline/upload/medialibrary/bcd/bcd60d4f9b834fe4657e7be70fa8e520.gif)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            mt: 35,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <form
            method="post"
            action="#"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
              {...register("username", {
                required: "Укажите имя пользователя",
              })}
              id="standard-basic"
              label="Username"
              variant="outlined"
              sx={{ mt: 4 }}
            />
            <TextField
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Укажите пароль",
              })}
              sx={{ mt: 6 }}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <Button
                variant="contained"
                sx={{ mt: 10, mb: 2 }}
                className="w-full "
                type="submit"
              >
                Войти
              </Button>
            </div>
          </form>
          <NavLink to="/register">
            <Button variant="outlined" size="small">
              Зарегестрироваться
            </Button>
          </NavLink>
        </Box>
      </Grid>
    </Grid>
  );
}
