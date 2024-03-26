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
import { useSelector } from "react-redux";
import { Link as routerr } from "react-router-dom";
import { useState } from "react";

function Header() {
  let [anchorElUser, setAnchorElUser] = useState(null);
  const counter = useSelector((state) => state.cart);
  const count = counter.cartItems.reduce((acc, a) => acc + a.qty, 0);
  let open = Boolean(anchorElUser);
  const handler = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleclose = () => {
    setAnchorElUser(null);
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

            <Button
              to="/signin"
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
            to="/dd"
            sx={{
              color: "#222831",

              fontSize: "14px",
            }}
            startIcon={<LocalGroceryStoreIcon></LocalGroceryStoreIcon>}
          >
            cart
          </Button>
        </MenuItem>
        <MenuItem onClick={handleclose}>
          <Button
            component={routerr}
            sx={{
              color: "#222831",

              fontSize: "14px",
            }}
            startIcon={<PersonOutlineIcon></PersonOutlineIcon>}
          >
            signin
          </Button>
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default Header;
