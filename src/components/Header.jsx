import * as React from "react";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
// import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MapIcon from "@mui/icons-material/Map";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/auth";
function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MapIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 6,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NavLink to="/"> My Trip</NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  color="inherit"
                  noWrap
                  variant="body2"
                  to="/"
                  sx={{ p: 1, flexShrink: 0 }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-[purple]"
                  }
                >
                  Маршруты
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  color="inherit"
                  noWrap
                  variant="body2"
                  to="/reviews"
                  sx={{ p: 1, flexShrink: 0 }}
                  className={({ isActive }) =>
                    isActive ? "text-green-300" : "hover:text-[purple]"
                  }
                >
                  Отзывы
                </NavLink>
              </MenuItem>
              {isAuth ? (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink
                      color="inherit"
                      noWrap
                      variant="body2"
                      to="/create"
                      sx={{ p: 1, flexShrink: 0 }}
                      className={({ isActive }) =>
                        isActive ? "text-green-300" : "hover:text-[purple]"
                      }
                    >
                      Создать
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink
                      color="inherit"
                      noWrap
                      variant="body2"
                      to="/favorites"
                      sx={{ p: 1, flexShrink: 0 }}
                      className={({ isActive }) =>
                        isActive ? "text-green-300" : "hover:text-[purple]"
                      }
                    >
                      Избранное
                    </NavLink>
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              {/* {sections.map((section) => (
                <MenuItem key={section} onClick={handleCloseNavMenu}>
                  <NavLink
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    to={section.url}
                    sx={{ p: 1, flexShrink: 0 }}
                    className={({ isActive }) =>
                      isActive ? "text-green-300" : "hover:text-[purple]"
                    }
                  >
                    {section.title}
                  </NavLink>
                </MenuItem>
              ))} */}
              {isAuth ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <p
                    onClick={onClickLogout}
                    className="cursor-pointer hover:text-[purple]"
                  >
                    Выход
                  </p>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink
                    color="inherit"
                    noWrap
                    variant="body2"
                    to="/login"
                    sx={{ p: 1, flexShrink: 0 }}
                    className={({ isActive }) =>
                      isActive ? "text-green-300" : "hover:text-[purple]"
                    }
                  >
                    Вход
                  </NavLink>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <MapIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NavLink to="/"> My Trip</NavLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "space-between",
            }}
          >
            <div>
              <NavLink
                color="inherit"
                noWrap
                variant="body2"
                to="/"
                sx={{ p: 1, flexShrink: 0 }}
                className={({ isActive }) =>
                  isActive ? "text-green-300" : "hover:text-[purple]"
                }
              >
                Маршруты
              </NavLink>
              <NavLink
                color="inherit"
                noWrap
                variant="body2"
                to="/reviews"
                sx={{ p: 1, flexShrink: 0 }}
                className={({ isActive }) =>
                  isActive ? "text-green-300" : "hover:text-[purple]"
                }
                style={{ marginLeft: "20px", transitionDuration: '0.5s' }}
              >
                Отзывы
              </NavLink>
              {isAuth ? (
                <>
                  <NavLink
                    color="inherit"
                    noWrap
                    variant="body2"
                    to="/create"
                    sx={{ p: 1, flexShrink: 0 }}
                    className={({ isActive }) =>
                      isActive ? "text-green-300" : "hover:text-[purple]"
                    }
                    style={{ marginLeft: "20px", transitionDuration: '0.5s' }}
                  >
                    Создать
                  </NavLink>
                  <NavLink
                    color="inherit"
                    noWrap
                    variant="body2"
                    to="/favorites"
                    sx={{ p: 1, flexShrink: 0 }}
                    className={({ isActive }) =>
                      isActive ? "text-green-300" : "hover:text-[purple]"
                    }
                    style={{ marginLeft: "20px", transitionDuration: '0.5s' }}
                  >
                    Мои маршруты
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </div>
            {isAuth ? (
              <p
                onClick={onClickLogout}
                className="cursor-pointer hover:text-[purple]"
              >
                Выход
              </p>
            ) : (
              <NavLink
                color="inherit"
                noWrap
                variant="body2"
                to="/login"
                sx={{ p: 1, flexShrink: 0 }}
                className={({ isActive }) =>
                  isActive ? "text-green-300" : "hover:text-[purple]"
                }
              >
                Вход
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
