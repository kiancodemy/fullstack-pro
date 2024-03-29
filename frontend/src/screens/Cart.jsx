import React, { useMemo } from "react";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  Button,
  Link,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { deletecart, addtToCart } from "../slices/cardslice";
import { Link as routerr } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const dispatch = useDispatch();
  const totalprice = useSelector((state) => state.cart.totalPrice);
  const total = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + item.qty, 0)
  );
  const cartItems = useSelector((state) => state.cart.cartItems);
  const AllProducts = useMemo(() => {
    if (cartItems.length === 0) {
      return (
        <Typography
          sx={{
            textTransform: "capitalize",
            paddingY: "20px",
            color: "#222831",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          cartitems is empty
        </Typography>
      );
    } else {
      return cartItems.map((item) => (
        <Grid
          key={item.name}
          spacing={2}
          container
          sx={{
            paddingBottom: "15px",
            paddingX: "15px",
            alignItems: "center",
            borderBottom: "3px solid",
            borderColor: "#aaa",
          }}
        >
          <Grid item xs={2}>
            <img
              style={{
                borderRadius: "5px",
                width: "100%",
              }}
              src={item.image}
              alt="product-image"
            />
          </Grid>
          <Grid sx={{ textAlign: "center" }} item xs={3}>
            <Link to={`/product/${item._id}`} component={routerr}>
              {item.name}
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "center" }} item xs={3}>
            <Typography sx={{ color: "#222831", fontWeight: "bold" }}>
              $ {item.price}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <FormControl size="small">
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={item.qty}
                onChange={(e) =>
                  dispatch(addtToCart({ ...item, qty: Number(e.target.value) }))
                }
                label="quantity"
              >
                {[...Array(item.countInStock).keys()].map((items) => (
                  <MenuItem key={items} value={items + 1}>
                    {items + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => dispatch(deletecart(item))}
                sx={{
                  backgroundColor: "#ddd",
                  "&:hover": { backgroundColor: "#bbb" },
                  borderRadius: "3px",
                }}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ));
    }
  }, [cartItems]);

  ///main return
  return (
    <Container>
      <Button
        to="/"
        sx={{
          background: "#222831",
          textTransform: "capitalize",
          marginTop: "5px",
          color: "white",
          transition: "transform 0.5s ease",
          "&:hover": {
            background: "#1B1A55",
            transform: "translateX(10px)",
          },
        }}
        component={routerr}
      >
        Go back
      </Button>

      <Grid spacing={4} sx={{ paddingY: "10px" }} container>
        <Grid xs={12} md={8} item>
          <Typography
            sx={{
              color: "#222831",

              textTransform: "capitalize",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: { md: "30px", xs: "16px" },
              paddingY: "20px",
            }}
          >
            shopping cart
          </Typography>

          <Stack direction={"column"} spacing={4}>
            {AllProducts}
          </Stack>
        </Grid>

        <Grid xs={12} md={4} item>
          <Paper sx={{ padding: "10px" }} elevation={2}>
            <Stack direction={"column"} spacing={2} sx={{ paddingY: "10px" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "30px",

                  color: "#222831",
                }}
              >
                subtotal {total} items
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>${totalprice}</Typography>
            </Stack>

            <Divider
              sx={{ height: "2px", backgroundColor: "#aaa" }}
              component="ul"
            ></Divider>

            <Box sx={{ paddingY: "15px", paddingX: "5px" }}>
              <Button
                component={routerr}
                to="/shipping"
                sx={{
                  background: "#222831",
                  textTransform: "capitalize",

                  color: "white",

                  "&:hover": {
                    background: "#1B1A58",
                  },
                }}
              >
                proceed to checkout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
