import {
  Container,
  Grid,
  IconButton,
  Tooltip,
  Button,
  Link,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Link as routerr } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) =>
    state.cart.cartItems.length === 0 ? (
      <Typography
        sx={{
          textTransform: "capitalize",
          paddingY: "20px",

          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        cartitems is empty
      </Typography>
    ) : (
      state.cart.cartItems.map((item) => {
        return (
          <Grid
            spacing={2}
            container
            sx={{
              paddingBottom: "15px",
              paddingX: "10px",
              alignItems: "center",

              borderBottom: "3px solid",
              borderColor: "#aaa",
            }}
            key={item.name}
          >
            <Grid item md={2} xs={2}>
              <img
                style={{
                  borderRadius: "5px",
                  width: "100%",
                }}
                src={item.image}
                alt="product-image"
              />
            </Grid>
            <Grid sx={{ textAlign: "center" }} item md={4} xs={4}>
              <Link to={`/product/${item._id}`} component={routerr}>
                {item.name}
              </Link>
            </Grid>
            <Grid item md={2} xs={3}>
              <Typography sx={{ color: "#222831", fontWeight: "bold" }}>
                $ {item.price}
              </Typography>
            </Grid>
            <Grid item md={3} xs={1}>
              <Tooltip title="Delete">
                <IconButton
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
        );
      })
    )
  );
  return (
    <Container>
      <Grid sx={{ paddingY: "10px" }} container>
        <Grid xs={12} md={8} item>
          <Button
            to="/"
            sx={{
              background: "#222831",
              textTransform: "capitalize",
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
          v
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
