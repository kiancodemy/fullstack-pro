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

import { useLoginMutation } from "../slices/userApiSlice";
import { setCredential } from "../slices/authslice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
function Login() {
  const { userinfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect") || "/";
  const [log, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [userinfo, redirect, navigate]);

  const {
    register,

    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  //submit function//
  const onSubmit = async (data) => {
    if (isValid) {
      try {
        const res = await log(data).unwrap();

        dispatch(setCredential({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data.message, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: { xs: "20px", md: "30px" } }}
      autoComplete="off"
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
      <Paper
        elevation={2}
        sx={{
          maxWidth: "500px",

          padding: { xs: "15px", md: "25px" },

          display: "flex",
          flexDirection: "column",
          gap: "15px",
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
          Log in
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
          id="outlined"
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
          <Typography>New user?</Typography>
          <Button
            sx={{
              textTransform: "capitalize",
              color: "#000",
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            component={Link}
          >
            register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
