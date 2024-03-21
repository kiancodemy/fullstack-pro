import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as routerr } from "react-router-dom";

function Header() {
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
            direction={"row"}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Button
              component={routerr}
              to="/dd"
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
            aria-label="menue"
            sx={{ display: { xs: "static", md: "none", color: "#eeee" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
