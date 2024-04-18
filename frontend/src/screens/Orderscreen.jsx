import { useParams } from "react-router-dom";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  usePayOrderMutation,
  usePaypalIdQuery,
  useGetOrderDetailQuery,
  useSetToDeliveredMutation,
} from "../slices/orderApislice";
const style = { layout: "vertical" };
import {
  Box,
  Button,
  Grid,
  Typography,
  Alert,
  Paper,
  Container,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Error from "../components/Error";
import { useSelector } from "react-redux";

import Loading from "../components/loading";

function Orderscreen() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [{ isPending }, dispatch] = usePayPalScriptReducer();
  const { userinfo } = useSelector((state) => state.auth);

  const [payorder, { isLoading: updating }] = usePayOrderMutation();
  const [delivered] = useSetToDeliveredMutation();
  let {
    data: order,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailQuery(orderId);
  const {
    data,
    isLoading: paypalloading,
    error: paypalerror,
  } = usePaypalIdQuery();

  ///handle deliver by admin
  const handledeliver = async () => {
    try {
      const send = await delivered(orderId);

      toast.success("delivered Successfully", {
        position: "bottom-right",
      });
      refetch();
      setTimeout(() => {
        navigate("/admin/orderlist");
      }, 1500);
    } catch (err) {
      toast.error("did not delivered try agai", {
        position: "bottom-right",
      });
    }
  };

  async function approvetest() {
    try {
      const get = await payorder({ id: orderId, details: { pay: {} } });
      refetch();

      toast.success("Paid Successfully", {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      toast.error(err.data.message, {
        position: "bottom-right",
      });
    }
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    });
  }
  /*function onApprove(data, actions) {
    return actions.order.capture().then(async function (data) {
      try {
        const order = await payorder({ id: orderId, data });
        refetch();
        toast.success("Paid Successfully", {
          position: "bottom-right",
        });
      } catch (err) {
        refetch();
        toast.success(err.data.message, {
          position: "bottom-right",
        });
      }
    });
  }*/

  //useeffect
  /*useEffect(() => {
    if (!paypalerror && !paypalloading && data.clientId) {
      const get = async () => {
        dispatch({
          type: "resetOptions",
          value: {
            clientId: data.clientId,
            currency: "USD",
            intent: "capture",
          },
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          get();
        }
      }
    }
  }, [paypalerror, paypalloading, data, order]);*/

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message={error} />
  ) : (
    <Container sx={{ paddingY: "20px" }}>
      <Typography
        sx={{
          fontSize: { lg: "30px", xs: "20px" },
          fontWeight: "bold",
          textTransform: "capitalize",
          color: "#00224D",
        }}
      >
        order {order._id}
      </Typography>
      <Grid columnGap={4} container>
        <Grid item xs={12} md={7}>
          <List sx={{ paddingY: "20px" }}>
            <ListItem>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: { lg: "30px", xs: "20px" },
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "#00224D",
                  }}
                >
                  shipping
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ color: "#00224D" }}>
                    <span style={{ fontWeight: "bold" }}>Name</span>:
                    <span> </span>
                    <span>{order.user.name}</span>
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ color: "#00224D" }}>
                    <span style={{ fontWeight: "bold" }}>Email</span>:
                    <span> </span>
                    <span>{order.user.email}</span>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ color: "#00224D" }}>
                    <span style={{ fontWeight: "bold" }}>Adress</span>:
                    <span> </span>
                    <span>{order.shippingAddress.address}</span>,
                    <span>{order.shippingAddress.city}</span>,
                    <span>{order.shippingAddress.country}</span>,
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText>
                <Alert
                  icon={false}
                  color="warning"
                  sx={{
                    backgroundColor: `${
                      order.isDelivered ? "#A5DD9B" : "#f5a9a9"
                    }`,
                  }}
                >
                  {order.isDelivered ? (
                    <span style={{ fontWeight: "bold" }}>Delivered</span>
                  ) : (
                    <span style={{ fontWeight: "bold" }}>Not Deliver</span>
                  )}
                </Alert>
              </ListItemText>
            </ListItem>
          </List>
          <Divider sx={{ border: "1px solid #aaa" }}></Divider>
          {/*second */}
          <List>
            <ListItem>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: { lg: "30px", xs: "20px" },
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "#00224D",
                  }}
                >
                  payment Method
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ color: "#00224D" }}>
                    <span style={{ fontWeight: "bold" }}>Method</span>:
                    <span> </span>
                    <span>{order.paymentmethod}</span>
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText>
                <Alert
                  icon={false}
                  color="warning"
                  sx={{
                    backgroundColor: `${order.isPaid ? "#A5DD9B" : "#f5a9a9"}`,
                  }}
                >
                  {order.isPaid ? (
                    <span style={{ fontWeight: "bold" }}>
                      Paid at {order.paidAt}
                    </span>
                  ) : (
                    <span style={{ fontWeight: "bold" }}>Not Paid</span>
                  )}
                </Alert>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        {/*right*/}
        <Grid item xs={9} md={4}>
          <Paper sx={{ padding: "10px" }}>
            <Typography
              sx={{
                color: "#aaa",
                fontWeight: "bold",
                fontSize: { xs: "20px", md: "30px" },
                textTransform: "capitalize",
              }}
            >
              order summary
            </Typography>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                items
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${order.itemPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                shipping
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${order.shippingPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                tax
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${order.taxPrice}
              </Grid>
            </Grid>
            <Grid
              sx={{ borderBottom: "1px solid #aaa", padding: "15px" }}
              container
            >
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                total
              </Grid>
              <Grid
                item
                sx={{
                  textTransform: "capitalize",
                  color: "#3D3B40",
                  fontSize: "18px",
                  fontweight: "bold",
                }}
                xs={6}
              >
                ${order.totalPrice}
              </Grid>
            </Grid>

            {isPending || updating ? (
              <Loading></Loading>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Button
                  onClick={approvetest}
                  sx={{
                    backgroundColor: "#124076",
                    marginTop: "10px",
                    textTransform: "capitalize",

                    "&:hover": {
                      backgroundColor: "#00224D",
                    },
                  }}
                  variant="contained"
                  type="submit"
                >
                  Pay Now (test mode)
                </Button>
                {userinfo &&
                  userinfo.admin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <Button
                      onClick={handledeliver}
                      sx={{
                        color: "white",
                        backgroundColor: "#124076",
                        marginTop: "10px",
                        textTransform: "capitalize",

                        "&:hover": {
                          backgroundColor: "#00224D",
                        },
                      }}
                    >
                      Set it to delivered
                    </Button>
                  )}

                {/*{!order.isPaid && (
                  <PayPalButtons
                    style={style}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onerror}
                  ></PayPalButtons>
                )}*/}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Orderscreen;
