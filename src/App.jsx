import React from "react";
import Header from "./components/Header";
import AllRoutes from "./pages/AllRoutes";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateRoute from "./pages/CreateRoute";
import RouteFull from "./pages/RouteFull";
import Reviews from "./pages/Reviews";
import Favorites from "./pages/Favorites";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <>
      {" "}
      <Header />
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<AllRoutes />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<CreateRoute />}></Route>
          <Route path="/route/:id" element={<RouteFull />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/Favorites" element={<Favorites />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
