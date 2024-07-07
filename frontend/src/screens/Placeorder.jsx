import {
  Button,
  Container,
  Typography,
  Link,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAddOrderMutation } from "../slices/orderApislice";
import { clearcard } from "../slices/cardslice";
import { useEffect } from "react";

import { Link as routerr } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutNavbar from "../components/Checkout";
//order function //
function Placeorder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [send, { isLoading }] = useAddOrderMutation();

  const { address, city, postalcode, country } = useSelector(
    (state) => state.cart.shippingAddress
  );

  const payment = useSelector((state) => state.cart.paymentmethod);
  const cart = useSelector((state) => state.cart);
  //useeffect//
  useEffect(() => {
    if (Object.keys(cart.shippingAddress).length === 0) {
      navigate("/shipping");
    } else if (!cart.paymentmethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentmethod]);

  // place order main function//

  const orderHandler = async () => {
    try {
      const res = await send({
        cartItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentmethod: cart.paymentmethod,
        itemPrice: cart.itemPrice,
        totalPrice: cart.totalPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
      }).unwrap();
      dispatch(clearcard());
      toast.success("send successfully", {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate(`/orders/${res._id}`);
      }, 2500);
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "bottom-right",
      });
    }
  };
  //the items we choosed//
  const all = cart.cartItems.map((items) => (
    <Grid
      key={items.name}
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
      <Grid item xs={3}>
        <img
          style={{
            borderRadius: "5px",
            width: "100%",
          }}
          src={items.image}
          alt="product-image"
        />
      </Grid>
      <Grid item sx={{ textAlign: "center" }} xs={4}>
        <Link to={`/product/${items._id}`} component={routerr}>
          {items.name}
        </Link>
      </Grid>
      <Grid item xs={5}>
        <Typography sx={{ color: "#222831", fontWeight: "bold" }}>
          {items.qty}* ${items.price} = ${Number(items.price) * items.qty}
        </Typography>
      </Grid>
    </Grid>
  ));

  // main return
  return (
    <Container>
      <Box sx={{ maxWidth: "500px", margin: "auto", marginY: "20px" }}>
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
                fontSize: { xs: "14px", md: "18px" },
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
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                items
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${cart.itemPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                shipping
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${cart.shippingPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                tax
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${cart.taxPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                total
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${cart.totalPrice}
              </Grid>
            </Grid>

            {isLoading ? (
              <LoadingButton
                sx={{
                  alignSelf: "start",
                  backgroundColor: "#124076",

                  "& .MuiCircularProgress-root": {
                    color: "white",
                  },
                }}
                loading
                variant="outlined"
              >
                <span>Lading</span>
              </LoadingButton>
            ) : (
              <Button
                onClick={orderHandler}
                sx={{
                  backgroundColor: "#124076",
                  marginTop: "10px",
                  textTransform: "capitalize",

                  "&:hover": {
                    backgroundColor: "#00224D",
                  },
                }}
                variant="contained"
                type="submit"
              >
                continue
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Placeorder;
