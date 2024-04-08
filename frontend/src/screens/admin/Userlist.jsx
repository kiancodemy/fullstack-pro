import {
  useGetAllUsersQuery,
  useUpdateuserMutation,
  useDeletedeUserMutation,
} from "../../slices/userApiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../components/loading";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";

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
function Userlist() {
  const { data: orders, isLoading } = useGetAllUsersQuery();
  const [updater] = useUpdateuserMutation();
  const [deleter] = useDeletedeUserMutation();

  const deletee = async (id) => {
    try {
      await deleter(id).unwrap();
      toast.success("Deleted Successfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
      });
    }
  };

  const update = async (id) => {
    try {
      await updater(id).unwrap();
      toast.success("Updated Successfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
      });
    }
  };

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>

                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  NAME
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="left">
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  ADMIN
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  align="center"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((row, index) => (
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
                    {row._id}
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    {row.email}
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    <IconButton onClick={() => update(row._id)}>
                      {row.isAdmin ? (
                        <CheckIcon sx={{ color: "#367E18" }}></CheckIcon>
                      ) : (
                        <ClearIcon sx={{ color: "#E72929" }}></ClearIcon>
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => deletee(row._id)}
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
    </Container>
  );
}

export default Userlist;
