import {
  Box,
  Grid,
  Typography,
  Container,
  CardContent,
  Rating,
  Paper,
  Button,
  Link,
  Card,
  CardMedia,
} from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Carousel from "react-material-ui-carousel";

import { useGetproductsQuery } from "../slices/productionapi";

import Loading from "../components/loading";

function Carosel() {
  const { data: products, isLoading } = useGetproductsQuery(1);
  return (
    <Container sx={{ marginTop: "20px" }} maxWidth="md">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Carousel
          navButtonsAlwaysVisible
          interval="4000"
          autoPlay
          duration="500"
          animation="slide"
          NextIcon={
            <KeyboardDoubleArrowRightOutlinedIcon sx={{ color: "#ddd" }} />
          }
          PrevIcon={
            <KeyboardDoubleArrowLeftOutlinedIcon sx={{ color: "#ddd" }} />
          }
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          {products.data.map((item, i) => (
            <Box
              key={i}
              sx={{
                backgroundColor: "#ddd",
                position: "relative",

                display: "flex",
                borderRadius: "10px",

                overflow: "hidden",
                height: "450px",
              }}
            >
              <Box sx={{ width: { md: "100%", xs: "100%" } }}>
                <img
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "90%",
                  }}
                  src={item.image}
                  alt="picture"
                />
              </Box>

              <Typography
                sx={{
                  position: "absolute",

                  fontSize: "20px",

                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  paddingY: "20px",

                  bottom: 0,
                  right: 0,
                  left: 0,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {item.name} (${item.price})
              </Typography>
            </Box>
          ))}
        </Carousel>
      )}
    </Container>
  );
}

export default Carosel;
