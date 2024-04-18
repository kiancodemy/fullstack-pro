import {
  Box,
  Grid,
  Typography,
  Paper,
  Container,
  CardContent,
  Rating,
  Link,
  Card,
  CardMedia,
} from "@mui/material";
import Carosel from "./Carosel";
import { useGetproductsQuery } from "../slices/productionapi";
import Paginations from "./Pagination";
import { Link as routerr, useParams } from "react-router-dom";
import Loading from "../components/loading";
import { useSelector } from "react-redux";

import Error from "../components/Error";
function Homescreen() {
  const { pages, key } = useParams();

  const {
    data: products,
    error,
    isLoading,
  } = useGetproductsQuery({ pages, key });
  const { userinfo } = useSelector((state) => state.auth);

  return error ? (
    <Error message={error}></Error>
  ) : isLoading ? (
    <Loading></Loading>
  ) : (
    <Box id="kian" sx={{ flexGrow: 1, paddingY: "10px" }}>
      <Container>
        <Carosel></Carosel>
        <Typography
          variant="h5"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            paddingY: "10px",
            fontSize: "30px",
            color: "#607274",
          }}
        >
          latest products
        </Typography>
        <Grid container sx={{ paddingY: "10px" }} spacing={2}>
          {products.data.map((item) => {
            return (
              <Grid key={item._id} xs={12} sm={6} md={4} lg={3} item>
                <Paper
                  sx={{ borderRadius: "10px", padding: "10px" }}
                  elevation={1}
                >
                  <Card>
                    <Link to={`/product/${item._id}`} component={routerr}>
                      <CardMedia
                        component="img"
                        height={250}
                        image={item.image}
                        alt="image-product"
                      ></CardMedia>
                    </Link>
                    <CardContent>
                      <Link
                        underline="hover"
                        sx={{ color: "#31363F" }}
                        to={`/product/${item._id}`}
                        component={routerr}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                      <Box
                        sx={{ display: "flex", gap: "5px", paddingY: "10px" }}
                      >
                        <Rating
                          precision={0.5}
                          name="simple-controlled"
                          value={item.rating}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                        <Typography>{item.numReviews} review</Typography>
                      </Box>
                      <Typography
                        sx={{
                          paddingY: "10px",
                          fontSize: "18px",
                          color: "#31363F",
                          fontWeight: "bold",
                        }}
                      >
                        $ {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Paginations
          keys={key}
          admin={userinfo?.admin}
          count={products.count}
        />
      </Container>
    </Box>
  );
}

export default Homescreen;
