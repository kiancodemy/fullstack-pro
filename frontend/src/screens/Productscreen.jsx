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
  TextField,
  InputLabel,
  Paper,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { Link as routerr } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import {
  useGetproductsbyidQuery,
  useAddReviewMutation,
} from "../slices/productionapi";
import Loading from "../components/loading";
import Error from "../components/Error";
import { addtToCart } from "../slices/cardslice";

function Productscreen() {
  const currencies = [
    {
      value: "1",
      label: "1-poor",
    },
    {
      value: "2",
      label: "2-fair",
    },
    {
      value: "3",
      label: "3-good",
    },
    {
      value: "4",
      label: "4-very good",
    },
    {
      value: "5",
      label: "5-exellent",
    },
  ];
  const { userinfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [review, { isLoading: isreview }] = useAddReviewMutation();
  const { id: productid } = useParams();
  const { data: finder, error, isLoading } = useGetproductsbyidQuery(productid);

  const [Quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addtToCart({ ...finder, qty: Number(Quantity) }));
  };

  const handleChange = (event) => {
    setQuantity(Number(event.target.value));
  };
  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const submit = async (data) => {
    try {
      const send = await review({ data, id: productid }).unwrap();
      console.log(send);
      toast.success("Review Added Successfully", {
        position: "top-right",
      });
      reset();
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
      });
      reset();
    }
  };

  return error ? (
    <Error message={error}></Error>
  ) : isLoading || isreview ? (
    <Loading></Loading>
  ) : (
    <Container sx={{ paddingY: "20px" }}>
      <Meta title={finder.name}></Meta>
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
          <img
            src={finder.image}
            style={{ width: "100%", borderRadius: "10px" }}
            alt="producy-image"
          />
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
                          <MenuItem key={item + 2} value={item + 1}>
                            {item + 1}
                          </MenuItem>
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
      {/*sscond*/}
      <Box
        component="form"
        sx={{ marginTop: "10px" }}
        onSubmit={handleSubmit(submit)}
      >
        <Typography
          sx={{
            maxWidth: "500px",
            fontSize: "20px",
            color: "#31363F",
            fontWeight: "bold",
            backgroundColor: "#CCD3CA",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          Reviews
        </Typography>
        <Box
          sx={{
            marginY: "10px",
            paddingY: "10px",
            display: "flex",
            gap: "20px",

            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {finder.reviews.map((item) => {
            return (
              <Paper
                elevation={1}
                key={item.user}
                sx={{
                  maxWidth: "300px",
                  minWidth: "150px",
                  wordBreak: "break-all",

                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "10px",
                  paddingX: "15px",
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {item.name}
                </Typography>
                <Rating value={item.rating}></Rating>
                <Typography>
                  {new Date(item.createdAt)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "-")}
                </Typography>
                <Typography sx={{ marginTop: "10px" }}>
                  {item.comment}
                </Typography>
              </Paper>
            );
          })}
        </Box>
        <Divider sx={{ backgroundColor: "#aaa" }}></Divider>
        {userinfo?._id ? (
          <Box
            sx={{
              maxWidth: "500px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",

                color: "#31363F",
                fontWeight: "bold",
                textTransform: "capitalize",
                backgroundColor: "#CCD3CA",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              write a custome review
            </Typography>
            <TextField
              {...register("rating")}
              id="outlined-select-rating"
              select
              label="Rating"
              defaultValue="1"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("comment", { required: true })}
              required
              id="outlined-comment"
              label="Comment"
            ></TextField>
            <Button
              variant="contained"
              disabled={isSubmitting}
              sx={{
                alignSelf: "flex-start",
                textTransform: "capitalize",
                bgcolor: "#222831",
                "&:hover": { backgroundColor: "#31363F" },
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              color: "white",
              marginTop: "10px",
              textTransform: "capitalize",
              bgcolor: "#222831",
              "&:hover": { backgroundColor: "#31363F" },
            }}
            component={routerr}
            to="/login"
          >
            Comment your experience
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Productscreen;
