import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { Link as routerr } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutNavbar from "../components/Checkout";

function Placeorder() {
  const navigate = useNavigate();

  const { address, city, postalcode, country } = useSelector(
    (state) => state.cart.shippingAddress
  );
  const payment = useSelector((state) => state.cart.paymentmethod);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (Object.keys(cart.shippingAddress).length === 0) {
      navigate("/shipping");
    } else if (!cart.paymentmethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentmethod]);
  const all = cart.cartItems.map((item) => (
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
      <Grid sx={{ textAlign: "center" }} item xs={4}>
        <Link to={`/product/${item._id}`} component={routerr}>
          {item.name}
        </Link>
      </Grid>
      <Grid sx={{ textAlign: "center" }} item xs={4}>
        <Typography sx={{ color: "#222831", fontWeight: "bold" }}>
          {item.qty}* ${item.price} = ${Number(item.price) * item.qty}
        </Typography>
      </Grid>
    </Grid>
  ));

  //
  return (
    <Container>
      <Box sx={{ maxWidth: "500px", margin: "auto", marginTop: "10px" }}>
        <CheckoutNavbar step={3}></CheckoutNavbar>
      </Box>
      <Grid sx={{ marginTop: "10px" }} columnGap={2} container>
        <Grid xs={12} md={7} item>
          <Box
            sx={{
              display: "flex",

              paddingLeft: "15px",
              flexDirection: "column",
              gap: "10px",
              borderBottom: "2px solid #B4B4B8",
              paddingY: { xs: "15px", md: "30px" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                color: "#00224D",
                fontSize: { xs: "20px", md: "28px" },
              }}
            >
              shipping
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#00224D",
                fontSize: { xs: "12px", md: "18px" },
              }}
            >
              <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                Adress :
              </span>
              :{address},{city} ,{postalcode} ,{country}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingLeft: "15px",
              borderBottom: "2px solid #B4B4B8",
              paddingY: { xs: "15px", md: "25px" },
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",

                color: "#00224D",
                fontSize: { xs: "20px", md: "28px" },
              }}
            >
              payment method
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                method :
              </span>
              {payment}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingLeft: "15px",

              paddingY: { xs: "15px", md: "25px" },
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",

                color: "#00224D",
                fontSize: { xs: "20px", md: "28px" },
              }}
            >
              order items
            </Typography>
            {all}
          </Box>
        </Grid>
        <Grid sx={{ padding: "10px" }} xs={12} md={4} item>
          <Paper sx={{ padding: "10px" }}>
            <Typography
              sx={{
                color: "#aaa",
                fontWeight: "bold",
                fontSize: { xs: "20px", md: "30px" },
                textTransform: "capitalize",
              }}
            >
              order summary
            </Typography>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
              xs={12}
            >
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
                item
              >
                items
              </Grid>
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                item
                xs={5}
              >
                ${cart.itemPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
              xs={12}
            >
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
                item
              >
                shipping
              </Grid>
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                item
                xs={5}
              >
                ${cart.shippingPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
              xs={12}
            >
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
                item
              >
                tax
              </Grid>
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                item
                xs={5}
              >
                ${cart.taxPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
              xs={12}
            >
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
                item
              >
                total
              </Grid>
              <Grid
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                item
                xs={5}
              >
                ${cart.totalPrice}
              </Grid>
            </Grid>

            <Button
              sx={{
                alignSelf: "start",
                backgroundColor: "#124076",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "#00224D",
                },
              }}
              variant="contained"
              type="submit"
            >
              continue
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Placeorder;
