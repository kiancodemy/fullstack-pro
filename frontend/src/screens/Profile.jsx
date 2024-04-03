import { useProfileMutation } from "../slices/userApiSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { setCredential } from "../slices/authslice";
import { useMyordersQuery } from "../slices/userApiSlice";

import {
  Button,
  Grid,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material";

function Profile() {
  //show pass/
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibilitys = () => {
    setShowPasswords(!showPasswords);
  };

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const { userinfo } = useSelector((state) => state.auth);
  const [send, { isLoading: isupdating }] = useProfileMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Pasword And Confirm Password Should Be Same", {
        position: "top-right",
      });
      return;
    }
    if (isValid) {
      try {
        const sended = await send(data).unwrap();
        dispatch(setCredential(sended));
        toast.success("Updated successful", {
          position: "top-right",
        });
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
        });
      }
    }
  };
  const { data: orders, isLoading, error } = useMyordersQuery();

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: { xs: "20px", md: "30px" } }}
      autoComplete="off"
    >
      {isupdating && <Loading></Loading>}
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
      >
        Go back
      </Button>
      <Grid container>
        <Grid item xs={12} md={4}>
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
              User Profile
            </Typography>
            <TextField
              InputLabelProps={{ style: { color: "#496989" } }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#496989",
                  },
              }}
              {...register("name")}
              id="outlined"
              label="Name"
              variant="outlined"
              defaultValue={userinfo.name}
              autoComplete="current-password"
            />
            <Typography
              sx={{
                color: "#E72929",
              }}
            >
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
              })}
              id="outlineds"
              label="email"
              type="text"
              variant="outlined"
              defaultValue={userinfo.email}
              autoComplete="current-password"
            />
            <Typography sx={{ color: "#E72929" }}>
              {errors.email?.message}
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#496989" } }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#496989",
                  },
              }}
              {...register("password")}
              id="outli-password-input"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
            />
            <Typography
              sx={{
                color: "#E72929",
              }}
            >
              {errors.password?.message}
            </Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibilitys}
                      edge="end"
                    >
                      {showPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#496989" } }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#496989",
                  },
              }}
              {...register("confirmpassword")}
              id="outlined-password-inputtt"
              label="Confirm Password"
              variant="outlined"
              type={showPasswords ? "text" : "password"}
              autoComplete="current-password"
            />
            <Typography
              sx={{
                color: "#E72929",
              }}
            >
              {errors.confirmpassword?.message}
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
            >
              Sign in
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}></Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
