import { useGetallordersQuery } from "../../slices/orderApislice";
import Loading from "../../components/loading";
import ClearIcon from "@mui/icons-material/Clear";

import { Link as routerr } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

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
function AllOrderList() {
  const { data: orders, isLoading } = useGetallordersQuery();
  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  DATE
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  NAME
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
              {orders.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#EEEDED" : "",
                    "&:last-child td, &:last-child th ": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {row.user.name}
                  </TableCell>
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
      )}
    </Container>
  );
}

export default AllOrderList;
