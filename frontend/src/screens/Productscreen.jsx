import {
  Link,
  Rating,
  Box,
  Container,
  Divider,
  Button,
  Grid,
  Typography,
  Card,
  MenuItem,
  FormControl,
  CardContent,
  InputLabel,
  Paper,
  Select,
} from "@mui/material";

import { Link as routerr } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetproductsbyidQuery } from "../slices/productionapi";
import Loading from "../components/loading";
import Error from "../components/Error";
import { addtToCart } from "../slices/cardslice";

function Productscreen() {
  const dispatch = useDispatch();
  const { id: productid } = useParams();
  const { data: finder, error, isLoading } = useGetproductsbyidQuery(productid);
  const navigate = useNavigate();
  const [Quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addtToCart({ ...finder, qty: Number(Quantity) }));
  };

  const handleChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  return error ? (
    <Error message={error}></Error>
  ) : isLoading ? (
    <Loading></Loading>
  ) : (
    <Container sx={{ paddingY: "20px" }}>
      <Button
        variant="contained"
        sx={{
          textTransform: "capitalize",
          bgcolor: "#222831",
          "&:hover": { backgroundColor: "#31363F" },
        }}
        component={routerr}
        to="/"
      >
        go back
      </Button>
      <Grid sx={{ paddingY: "20px" }} container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={finder.image} height={300} alt="producy-image" />
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ paddingTop: "20px", paddingX: "10px" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", paddingY: "10px", color: "#3D3B40" }}
            >
              {finder.name}
            </Typography>
            <Divider></Divider>

            <CardContent>
              <Box sx={{ display: "flex", gap: "5px", paddingY: "10px" }}>
                <Rating
                  precision={0.5}
                  name="simple-controlled"
                  value={finder.rating}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Typography>{finder.numReviews} review</Typography>
              </Box>
              <Divider></Divider>
              <Typography
                sx={{
                  paddingY: "10px",
                  fontSize: "18px",
                  color: "#31363F",
                  fontWeight: "bold",
                }}
              >
                $ {finder.price}
              </Typography>
              <Divider></Divider>
              <Typography sx={{ paddingY: "15px" }}>
                {finder.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3}>
            <Card>
              <CardContent sx={{ color: "#31363F" }}>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    paddingY: "10px",
                  }}
                >
                  price: ${finder.price}
                </Typography>
                <Divider></Divider>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    paddingY: "10px",
                  }}
                >
                  status:
                  {finder.countInStock > 0 ? "Available" : "Unavailable"}
                </Typography>
                <Divider></Divider>
                {finder.countInStock > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      paddingY: "10px",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Button
                      onClick={handleAddToCart}
                      sx={{
                        marginTop: "10px",
                        backgroundColor: "#31363F",
                        color: "white",

                        textTransform: "capitalize",
                        "&:hover": { backgroundColor: "#363062" },
                      }}
                      to="/card"
                      component={routerr}
                    >
                      Add to cart
                    </Button>
                    <FormControl
                      size="small"
                      sx={{
                        m: 1,
                        paddingTop: "5px",

                        minWidth: 80,
                      }}
                    >
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={Quantity}
                        onChange={handleChange}
                        label="quantity"
                      >
                        {[...Array(finder.countInStock).keys()].map((item) => (
                          <MenuItem value={item + 1}>{item + 1}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Productscreen;
