import { useProfileMutation } from "../slices/userApiSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import ClearIcon from "@mui/icons-material/Clear";

import { Link as routerr } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { setCredential } from "../slices/authslice";
import { useMyordersQuery } from "../slices/userApiSlice";

import {
  Button,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
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
  const { data: orders, isLoading, error, refetch } = useMyordersQuery();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Container
      maxWidth="xl"
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
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              padding: { xs: "15px", md: "25px" },

              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "30px", xs: "20px" },
                marginBottom: "10px",
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
              update
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <Box
              sx={{
                padding: { xs: "15px", md: "20px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { lg: "30px", xs: "20px" },
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginBottom: "10px",
                  color: "#00224D",
                }}
              >
                my orders
              </Typography>
              {/*table*/}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        DATE
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        TOTAL
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        PAID
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        DELIVERED
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold" }}
                        align="right"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th ": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell
                          sx={{ fontWeight: "bold" }}
                          component="th"
                          scope="row"
                        >
                          {row._id}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                          {new Date(row.paidAt).toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                          ${row.totalPrice}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                          {row.isPaid ? (
                            new Date(row.paidAt).toLocaleString()
                          ) : (
                            <span>Not Paid</span>
                          )}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                          {row.isDelivered ? (
                            <CheckIcon sx={{ color: "#367E18" }}></CheckIcon>
                          ) : (
                            <ClearIcon sx={{ color: "#E72929" }}></ClearIcon>
                          )}
                        </TableCell>
                        <TableCell
                          to={`/orders/${row._id}`}
                          sx={{
                            cursor: "pointer",
                            textDecoration: "none",
                            fontWeight: "bold",
                          }}
                          component={routerr}
                          align="right"
                        >
                          Details
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
