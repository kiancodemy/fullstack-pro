import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Link as routerr } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredential } from "../slices/authslice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
function Register() {
  const { userinfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect") || "/";
  const [registerr, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [userinfo, redirect, navigate]);

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.confirmpassword !== data.password) {
      toast.error("passwords dont match", {
        position: "top-right",
      });
      return;
    } else {
      if (isValid) {
        try {
          const res = await registerr(data).unwrap();

          dispatch(setCredential({ ...res }));
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message, {
            position: "bottom-left",
          });
        }
      }
    }
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: { xs: "20px", md: "10px" }, marginBottom: "10px" }}
      autoComplete="off"
    >
      <Button
        to="/"
        sx={{
          background: "#124076",
          textTransform: "capitalize",
          marginBottom: "10px",

          color: "white",

          "&:hover": {
            background: "#00224D",
          },
        }}
        component={routerr}
      >
        Go back
      </Button>
      <Paper
        elevation={2}
        sx={{
          maxWidth: "500px",

          padding: { xs: "15px", md: "25px" },

          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "35px", xs: "20px" },
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "#00224D",
          }}
        >
          sign up
        </Typography>
        <TextField
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
          id="outlined"
          label="Name"
          type="text"
          variant="outlined"
          autoComplete="current-password"
        />
        <Typography sx={{ color: "#E72929" }}>
          {errors.name?.message}
        </Typography>
        <TextField
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
            required: { value: true, message: "Email is required" },
          })}
          id="outline"
          label="email"
          type="text"
          variant="outlined"
          autoComplete="current-password"
        />
        <Typography sx={{ color: "#E72929" }}>
          {errors.email?.message}
        </Typography>
        <TextField
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 5,
              message: "Password should have minimim 5 characters",
            },
            maxLength: {
              value: 20,
              message: "Password should have maximum 20 characters",
            },
          })}
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          helperText={
            <span
              style={{
                fontSize: "12px",

                color: "#aaa",
              }}
            >
              Password should be between 5 to 20 character
            </span>
          }
        />
        <Typography
          sx={{
            color: "#E72929",
          }}
        >
          {errors.password?.message}
        </Typography>
        <TextField
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
              },
          }}
          {...register("confirmpassword", {
            required: { value: true, message: "confirmpassword is required" },
            minLength: {
              value: 5,
              message: "confirmpasswordshould have minimim 5 characters",
            },
            maxLength: {
              value: 20,
              message: "Confirm password should have maximum 20 characters",
            },
          })}
          id="outlined-password-inputt"
          label="Confirm Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          helperText={
            <span
              style={{
                fontSize: "12px",

                color: "#aaa",
              }}
            >
              Confirm password should be between 5 to 20 character
            </span>
          }
        />
        <Typography
          sx={{
            color: "#E72929",
          }}
        >
          {errors.confirmpassword?.message}
        </Typography>
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
            disabled
          >
            <span>Lading</span>
          </LoadingButton>
        ) : (
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
            disabled={isSubmitting || isLoading}
          >
            Sign in
          </Button>
        )}
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography>Already have account ?</Typography>
          <Button
            sx={{
              textTransform: "capitalize",
              color: "#000",
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            component={Link}
          >
            LogIn
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
