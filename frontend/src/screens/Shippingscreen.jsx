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
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
function Shippingscreen() {
  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  return (
    <Container sx={{ marginTop: "30px" }}>
      <Stack
        direction={"column"}
        gap={1}
        sx={{ maxWidth: "500px", margin: "auto" }}
      >
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
