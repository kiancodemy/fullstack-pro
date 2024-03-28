import React from "react";

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
import logout from "../slices/authslice";
import { Link as routerr } from "react-router-dom";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  let [anchorElUser, setAnchorElUser] = useState(null);
  const counter = useSelector((state) => state.cart);
  const { userinfo } = useSelector((state) => state.auth);
  const count = counter.cartItems.reduce((acc, a) => acc + a.qty, 0);
  const [out] = useLogoutMutation();
  let open = Boolean(anchorElUser);
  const handler = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleclose = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = async () => {
    try {
      await out().unwrap();
      dispatch(logout());
      Navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Container>
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
            spacing={3}
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
                <Button
                  to="/profile"
                  component={routerr}
                  sx={{
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
                  }}
                  startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
                >
                  Logout
                </Button>
                <Typography>{userinfo.name}</Typography>
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
            to="/cart"
            sx={{
              color: "#222831",

              fontSize: "12px",
            }}
            startIcon={<LocalGroceryStoreIcon></LocalGroceryStoreIcon>}
          >
            cart
          </Button>
        </MenuItem>
        {userinfo ? (
          <MenuItem onClick={handleclose}>
            <Button
              component={routerr}
              sx={{
                color: "#222831",

                fontSize: "12px",
              }}
              startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
            >
              signin
            </Button>
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={handleclose}>
              <Button
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
            <MenuItem onClick={handleclose}>
              <Button
                component={routerr}
                sx={{
                  color: "#222831",

                  fontSize: "12px",
                }}
                startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
              >
                Logout
              </Button>
            </MenuItem>
          </>
        )}
      </Menu>
    </Container>
  );
}

export default Header;
