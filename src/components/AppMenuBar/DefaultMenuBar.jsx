//START IMPORTS
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { SiDungeonsanddragons } from "react-icons/si";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
//END IMPORTS

const DefaultMenuBar = ({ pages, settings, icon = null }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //Logout API
  const [sendLogout] = useSendLogoutMutation();
  //handle navigate
  const navigate = useNavigate();

  //handle logout;
  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      localStorage?.removeItem("userId");
      localStorage?.removeItem("cartId");
      localStorage?.removeItem("role");
      localStorage?.removeItem("persist");
      navigate("/accounts/signin");
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  //HANDLE NAV OPEN/CLOSE
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //UI RENDER LOGIC
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1b1a1a", opacity: "0.9", color: "pink" }}
      elevation={1}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.8rem",
            }}
          >
            <SiDungeonsanddragons size={50} />
            ZeroTwo
          </Typography>

          {pages?.length && (
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
                {pages?.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.link}
                  >
                    <Typography
                      sx={{ textDecoration: "none", textAlign: "center" }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <Typography
            variant="h5"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            to="/"
            component={Link}
          >
            <SiDungeonsanddragons size={40} />
            ZeroTwo
          </Typography>
          {pages?.length && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    "&:focus": { textDecoration: "underline" },
                    "&:hover": {
                      background: "whitesmoke",
                    },
                  }}
                  size="medium"
                  to={page.link}
                  component={Link}
                >
                  <Typography sx={{ color: "violet" }}>{page.name} </Typography>
                </Button>
              ))}
            </Box>
          )}
          {icon && (
            <Box
              sx={{ ml: "auto", marginRight: "2rem" }}
              component={Link}
              to="/products/cart"
            >
              {icon}
            </Box>
          )}
          {settings?.length && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open User Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings?.map((setting) => {
                  if (setting?.type?.length) {
                    return (
                      <MenuItem key={setting?.name}>
                        <Button onClick={handleLogout}>Logout</Button>
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                        to={setting.link}
                        component={Link}
                      >
                        <Button>{setting.name} </Button>
                      </MenuItem>
                    );
                  }
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DefaultMenuBar;
