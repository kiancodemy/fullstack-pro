import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Badge,
  Stack,
  MenuItem,
  Menu,
  Container,
  Typography,
  IconButton,
} from "@mui/material";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";

import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authslice";
import { Link as routerr } from "react-router-dom";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [anchorElUser, setAnchorElUser] = useState(null);
  let [anchorElUsers, setAnchorElUsers] = useState(null);
  const counter = useSelector((state) => state.cart);
  const { userinfo } = useSelector((state) => state.auth);
  const count = counter.cartItems.reduce((acc, a) => acc + a.qty, 0);
  const [out] = useLogoutMutation();
  const [open, setopen] = useState(false);
  const [opens, setopens] = useState(false);
  const handle = (event) => {
    setAnchorElUsers(event.currentTarget);
    setopens(true);
  };
  const handler = (event) => {
    setAnchorElUser(event.currentTarget);
    setopen(true);
  };

  const handlecloses = () => {
    setopens(false);
  };
  const handleclose = () => {
    setopen(false);
  };
  const handleLogOut = async () => {
    try {
      await out().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Container maxWidth="xl">
      <AppBar
        sx={{
          position: "static",

          marginTop: "15px",
          paddingY: "5px",

          borderRadius: "5px",
          bgcolor: "#222831",
        }}
      >
        <Toolbar sx={{ bgcolor: "inherit", display: "flex" }}>
          <Typography
            sx={{
              fontSize: {
                xs: "16px",
                flexGrow: 1,
                md: "20px",
                fontweight: "bold",
                textTransform: "capitalize",
                color: "#EEEEEE",
              },
            }}
          >
            shop store
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Badge badgeContent={count} color="primary">
              <Button
                component={routerr}
                to="/card"
                sx={{
                  color: "#EEEEEE",
                  textTransform: "capitalize",
                  "&:hover": { color: "#eeee" },
                  fontSize: "14px",
                }}
                startIcon={<LocalGroceryStoreIcon></LocalGroceryStoreIcon>}
              >
                cart
              </Button>
            </Badge>

            {!userinfo ? (
              <Button
                to="/login"
                component={routerr}
                sx={{
                  textTransform: "capitalize",
                  color: "#EEEEEE",
                  "&:hover": { color: "#eeee" },
                  fontSize: "14px",
                }}
                startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
              >
                signin
              </Button>
            ) : (
              <>
                {userinfo && userinfo.admin && (
                  <Button
                    onClick={handle}
                    sx={{
                      textTransform: "capitalize",
                      color: "#EEEEEE",
                      "&:hover": { color: "#eeee" },
                      fontSize: "14px",
                    }}
                  >
                    Admin panel
                  </Button>
                )}
                <Button
                  to="/profile"
                  component={routerr}
                  sx={{
                    textTransform: "capitalize",
                    color: "#EEEEEE",
                    "&:hover": { color: "#eeee" },
                    fontSize: "14px",
                  }}
                  startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
                >
                  Profile
                </Button>
                <Button
                  onClick={handleLogOut}
                  sx={{
                    color: "#EEEEEE",
                    "&:hover": { color: "#eeee" },
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
                >
                  Logout
                </Button>
                <span
                  style={{
                    color: "#EEEEEE",

                    textDecoration: "none",
                  }}
                >
                  {userinfo.name}
                </span>
              </>
            )}
          </Stack>
          <IconButton
            onClick={handler}
            aria-label="menue"
            sx={{ display: { xs: "static", md: "none", color: "#eeee" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {anchorElUser && (
        <Menu
          sx={{ display: { xs: "block", md: "none" } }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleclose}
          open={open}
        >
          <MenuItem onClick={handleclose}>
            <Button
              component={routerr}
              to="/card"
              sx={{
                color: "#222831",

                fontSize: "12px",
                textTransform: "capitalize",
              }}
              startIcon={<LocalGroceryStoreIcon></LocalGroceryStoreIcon>}
            >
              cart
            </Button>
          </MenuItem>
          {!userinfo && (
            <MenuItem onClick={handleclose}>
              <Button
                to="/login"
                component={routerr}
                sx={{
                  textTransform: "capitalize",
                  color: "#222831",

                  fontSize: "12px",
                }}
                startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
              >
                signin
              </Button>
            </MenuItem>
          )}
          {userinfo && (
            <MenuItem onClick={handleclose}>
              <Button
                to="/profile"
                component={routerr}
                sx={{
                  color: "#222831",

                  fontSize: "12px",
                }}
                startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
              >
                Profile
              </Button>
            </MenuItem>
          )}
          {userinfo && (
            <MenuItem onClick={handleclose}>
              <Button
                onClick={handleLogOut}
                sx={{
                  color: "#222831",

                  fontSize: "12px",
                }}
                startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
              >
                Logout
              </Button>
            </MenuItem>
          )}
        </Menu>
      )}
      {/* second*/}
      {anchorElUsers && (
        <Menu
          sx={{ display: { md: "block", xa: "none" } }}
          anchorEl={anchorElUsers}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={handlecloses}
          open={opens}
        >
          <MenuItem onClick={handlecloses}>
            <Button
              component={routerr}
              to="/admin/product"
              sx={{
                color: "#222831",

                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              product
            </Button>
          </MenuItem>
          {!userinfo && (
            <MenuItem onClick={handlecloses}>
              <Button
                to="/admin/users"
                component={routerr}
                sx={{
                  textTransform: "capitalize",
                  color: "#222831",

                  fontSize: "12px",
                }}
              >
                users
              </Button>
            </MenuItem>
          )}
          {userinfo && (
            <MenuItem onClick={handlecloses}>
              <Button
                to="/admin/orderlist"
                component={routerr}
                sx={{
                  color: "#222831",

                  fontSize: "12px",
                }}
              >
                orders
              </Button>
            </MenuItem>
          )}
          {userinfo && (
            <MenuItem onClick={handlecloses}>
              <Button
                onClick={handleLogOut}
                sx={{
                  color: "#222831",

                  fontSize: "12px",
                }}
              >
                Logout
              </Button>
            </MenuItem>
          )}
        </Menu>
      )}
    </Container>
  );
}

export default Header;
