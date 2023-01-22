import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";
import { createTheme } from "@mui/material/styles";
import { fetchRegister } from "../redux/slices/auth";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function SignInSide() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      avatarUrl: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Не удалось зарегестрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://i.gifer.com/KmJj.gif)",
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
              Регестрация
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              action="#"
              className="flex flex-col"
            >
              <TextField
                error={Boolean(errors.username?.message)}
                helperText={errors.username?.message}
                {...register("username", {
                  required: "Укажите имя пользователя",
                })}
                id="standard-basic"
                label="Username"
                variant="standard"
                sx={{ mt: 4 }}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="start">
                      {getValues("avatarUrl") ? (
                        // <AccountCircle
                        //   onClick={() => setOpen(true)}
                        //   sx={{ cursor: "pointer" }}
                        //   src={getValues("avatarUrl")}
                        // />
                        <div
                          src={getValues("avatarUrl")}
                          alt=""
                          onClick={() => setOpen(true)}
                          className="w-[36px] h-[36px] rounded-full bg-cover bg-center cursor-pointer"
                          style={{
                            backgroundImage: `url(${getValues("avatarUrl")})`,
                          }}
                        />
                      ) : (
                        <AccountCircle
                          onClick={() => setOpen(true)}
                          sx={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Укажите пароль",
                })}
                sx={{ mt: 6 }}
                label="Password"
                variant="standard"
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
                  type="submit"
                  variant="contained"
                  sx={{ mt: 10, mb: 2 }}
                  className="w-full"
                >
                  Зарегестрироваться
                </Button>
              </div>
            </form>
            <NavLink to="/login">
              <Button variant="outlined" size="small">
                Войти
              </Button>
            </NavLink>
          </Box>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <TextField
            error={Boolean(errors.avatarUrl?.message)}
            helperText={errors.avatarUrl?.message}
            {...register("avatarUrl")}
            id="standard-basic"
            label="Avatar Url"
            variant="standard"
            sx={{ mt: 4 }}
            onChange={getValues("avatarUrl")}
          />
        </Sheet>
      </Modal>
    </>
  );
}
