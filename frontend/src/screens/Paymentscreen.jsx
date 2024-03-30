import {
  Button,
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import { savepayment } from "../slices/cardslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutNavbar from "../components/Checkout";
import { useState, useEffect } from "react";
function Paymentscreen() {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const [value, setvalue] = useState("");
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (Object.keys(cart.shippingAddress).length === 0) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress]);

  const handle = (e) => {
    setvalue(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    if (value) {
      dipatch(savepayment(value));
      navigate("/placeorder");
    } else {
      toast.error("slect a method", {
        position: "top-right",
      });
    }
  };
  return (
    <Container
      component="form"
      onSubmit={submit}
      sx={{ marginTop: "30px", paddingY: "20px" }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <CheckoutNavbar step={2}></CheckoutNavbar>
        <Typography
          sx={{
            fontSize: { lg: "25px", xs: "20px" },
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "#00224D",
            marginBottom: "10px",
          }}
        >
          payment method
        </Typography>
        <Typography sx={{ color: "#00224D", textTransform: "capitalize" }}>
          select a method
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              value="paypal"
              onChange={handle}
              sx={{ textTransform: "capitalize" }}
              control={<Radio style={{ color: "#124076" }} />}
              label="paypal or credit card"
            />
          </RadioGroup>
        </FormControl>
        <Button
          sx={{
            alignSelf: "start",
            backgroundColor: "#124076",
            "&:hover": {
              backgroundColor: "#00224D",
            },
          }}
          variant="contained"
          type="submit"
        >
          continue
        </Button>
      </Box>
    </Container>
  );
}

export default Paymentscreen;
