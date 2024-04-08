import Loading from "../../components/loading";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

import {
  useGetproductsQuery,
  useUpdateProductByIdMutation,
  useDeleteProductMutation,
  useCreatItemMutation,
} from "../../slices/productionapi";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link as routerr } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Container,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material";
function productlist() {
  const { data: orders, error, isLoading, refetch } = useGetproductsQuery();
  const [create, { isLoading: iscreating }] = useCreatItemMutation();
  const [deleter, { isLoading: isdeleting }] = useDeleteProductMutation();
 
  const deleteProduct = async (id) => {
    console.log(id);
    await deleter(id);
    toast.success("Deleted Successfully", {
      position: "bottom-right",
    });
  };

  const createproduct = async () => {
    if (window.confirm("Are you sure you want to create product"))
      try {
        const data = await create().unwrap();
        console.log(data);
      } catch (err) {
        toast.error(err?.data.message, {
          position: "top-right",
        });
      }
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "15px",
          marginBottom: "15px",
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
          products
        </Typography>
        <Button
          onClick={createproduct}
          sx={{
            backgroundColor: "#124076",
            textTransform: "capitalize",
            color: "white",
            "&:hover": {
              backgroundColor: "#00224D",
            },
          }}
        >
          create product
        </Button>
      </Box>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>

                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  NAME
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  PRICE
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  CATEGORY
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  BRAND
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  align="right"
                ></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#DBDFEA" : "",
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
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    $ {row.price}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {row.category}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    {row.brand}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      to={`/update/${row._id}`}
                      component={routerr}
                      aria-label="update"
                    >
                      <EditCalendarOutlinedIcon
                        sx={{
                          padding: "1px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          color: "#000",

                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      ></EditCalendarOutlinedIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => deleteProduct(row._id)}
                      aria-label="delete"
                    >
                      <DeleteIcon
                        sx={{
                          padding: "1px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundColor: "#D71313",
                          color: "white",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      ></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {orders?.length === 0 && (
        <Typography
          sx={{
            marginTop: "10px",
            paddingY: "10px",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "25px",
            textTransform: "capitalize",
          }}
        >
          there is no product
        </Typography>
      )}
    </Container>
  );
}

export default productlist;
