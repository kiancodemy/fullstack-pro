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
import Paginations from "./Pagination";
import { Link as routerr, useParams } from "react-router-dom";
import Loading from "../components/loading";
import { useSelector } from "react-redux";

import Error from "../components/Error";

function Carosel() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];
  const { data: products, error, isLoading } = useGetproductsQuery(1);
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

            gap: "20px",
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
                height: "300px",
              }}
            >
              <Box sx={{ width: { md: "50%", xs: "100%" } }}>
                <img
                  style={{ width: "100%", objectFit: "cover", height: "100%" }}
                  src={item.image}
                  alt="picture"
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: { xs: "none", md: "block" },
                  backgroundColor: "#aaa",
                }}
              ></Box>
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
