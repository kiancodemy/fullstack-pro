import {
  Box,
  Grid,
  Typography,
  Paper,
  Container,
  CardContent,
  Rating,
  Link,
  CardActions,
  Card,
  CardMedia,
} from "@mui/material";
import { Link as routerr } from "react-router-dom";
import products from "../../products";
function Homescreen() {
  return (
    <Box sx={{ flexGrow: 1, paddingY: "10px" }}>
      <Container>
        <Typography
          variant="h5"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            paddingY: "10px",
            color: "#607274",
          }}
        >
          latest products
        </Typography>
        <Grid container sx={{ paddingY: "10px" }} spacing={2}>
          {products.map((item) => {
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
                          color: "#31363F",
                          fontWeight: "bold",
                        }}
                      >
                        {item.price}$
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default Homescreen;
