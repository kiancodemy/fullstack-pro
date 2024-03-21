import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  MenuItem,
  Menu,
  Typography,
  IconButton,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as routerr } from "react-router-dom";
import { useState } from "react";

function Header() {
  let [anchorElUser, setAnchorElUser] = useState(null);
  let open = Boolean(anchorElUser);
  const handler = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleclose = () => {
    setAnchorElUser(null);
  };

  return (
    <Box flexGrow={1}>
      <AppBar
        sx={{
          position: "static",
          marginTop: "15px",
          px: "10px",

          borderRadius: "5px",
          bgcolor: "#222831",
        }}
      >
        <Toolbar sx={{ bgcolor: "inherit", display: "flex" }}>
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                flexGrow: 1,
                md: "20px",
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
    </Box>
  );
}

export default Header;
