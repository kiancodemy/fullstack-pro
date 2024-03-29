import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import { Link as routerr } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingAdress } from "../slices/cardslice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutNavbar from "../components/Checkout";

import { useForm } from "react-hook-form";
function Shippingscreen() {
  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const onSubmit = async (data) => {
    if (isValid) {
      try {
        dipatch(saveShippingAdress(data));
        navigate("/payment");
      } catch (err) {
        toast.error(err?.message, {
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: "30px" }}
    >
      <Button
        to="/"
        sx={{
          background: "#124076",
          textTransform: "capitalize",
          marginBottom: "20px",

          color: "white",

          "&:hover": {
            background: "#00224D",
          },
        }}
        component={routerr}
      >
        Go back
      </Button>
      <Stack
        direction={"column"}
        gap={1}
        sx={{ maxWidth: "500px", margin: "auto" }}
      >
        <CheckoutNavbar step={1}></CheckoutNavbar>
        <Typography
          sx={{
            fontSize: { lg: "35px", xs: "20px" },
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "#00224D",
          }}
        >
          Shipping
        </Typography>
        <Typography sx={{ textTransform: "capitalize", color: "#00224D" }}>
          address
        </Typography>
        <TextField
          defaultValue={shippingAddress.address || ""}
          id="outlined"
          label="Enter address"
          type="text"
          variant="outlined"
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("address", {
            required: { value: true, message: "Adress is required" },
          })}
        ></TextField>
        <Typography
          sx={{
            color: "#E72929",
          }}
        >
          {errors.address?.message}
        </Typography>

        <Typography sx={{ textTransform: "capitalize", color: "#00224D" }}>
          city
        </Typography>
        <TextField
          id="outlined"
          label="Enter city"
          type="text"
          defaultValue={shippingAddress.city || ""}
          variant="outlined"
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("city", {
            required: { value: true, message: "City is required" },
          })}
        ></TextField>
        <Typography
          sx={{
            color: "#E72929",
          }}
        >
          {errors.city?.message}
        </Typography>
        <Typography sx={{ textTransform: "capitalize", color: "#00224D" }}>
          postal code
        </Typography>
        <TextField
          id="outlined"
          label="Enter postal code"
          type="text"
          variant="outlined"
          defaultValue={shippingAddress.postalcode || ""}
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("postalcode", {
            required: { value: true, message: "Postal code is required" },
          })}
        ></TextField>
        <Typography
          sx={{
            color: "#E72929",
          }}
        >
          {errors.postalcode?.message}
        </Typography>
        <Typography sx={{ textTransform: "capitalize", color: "#00224D" }}>
          country
        </Typography>
        <TextField
          id="outlined"
          label="Enter country"
          type="text"
          defaultValue={shippingAddress.country || ""}
          variant="outlined"
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("country", {
            required: { value: true, message: "country is required" },
          })}
        ></TextField>
        <Typography
          sx={{
            color: "#E72929",
          }}
        >
          {errors.country?.message}
        </Typography>
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
          disabled={isSubmitting}
        >
          continue
        </Button>
      </Stack>
    </Container>
  );
}

export default Shippingscreen;
