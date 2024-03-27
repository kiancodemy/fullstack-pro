import { Button, Container, TextField, Box, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data = 0) => {
    if (isValid) {
      console.log("done");

      console.log(data);

      return true;
    }
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ marginTop: "50px" }}
      autoComplete="off"
    >
      <Box
        sx={{
          maxWidth: "500px",

          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <TextField
          InputLabelProps={{ style: { color: "#496989" } }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#496989",
                // Change border color to red when focused
              },
          }}
          {...register("name", {
            required: { value: true, message: "Name is required" },
            minLength: {
              value: 3,
              message: "it should have minimim 3 characters",
            },
          })}
          id="outlined"
          error={false}
          label="Name"
          type="text"
          variant="outlined"
          autoComplete="current-password"
        />
        <Typography sx={{ textTransform: "capitalize", color: "#E72929" }}>
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
          {...register("password", {
            required: { value: true, message: "password is required" },
            minLength: {
              value: 10,
              message: "it should have minimim 3 characters",
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
                textTransform: "capitalize",
                fontSize: "12px",
                color: "#aaa",
              }}
            >
              password should be between 5 to 8 character
            </span>
          }
        />
        <Typography sx={{ textTransform: "capitalize", color: "#E72929" }}>
          {errors.password?.message}
        </Typography>
        <Button variant="contained" sx={{ alignSelf: "start" }} type="submit">
          sign in
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
