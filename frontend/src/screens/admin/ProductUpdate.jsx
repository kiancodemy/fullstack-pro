import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link as routerr, useNavigate } from "react-router-dom";
import {
  useGetproductsbyidQuery,
  useUpdateProductByIdMutation,
} from "../../slices/productionapi";
import { toast } from "react-toastify";
import {
  Button,
  Typography,
  Container,
  TextField,
  Paper,
  Box,
} from "@mui/material";
function ProductUpdate() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const { id } = useParams();
  const { data, isLoading } = useGetproductsbyidQuery(id);
  const [updater, { isLoading: isupdating }] = useUpdateProductByIdMutation();

  const submit = async (data) => {
    try {
      data.price = Number(data.price);
      data.countInStock = Number(data.countInStock);
      console.log(data.price);
      console.log(data.countInStock);

      if (data.price && data.countInStock) {
        await updater({ data, id }).unwrap();
        toast.success("Updated successfully", {
          position: "top-right",
        });
        navigate("/admin/product");
      } else {
        toast.error(
          <span style={{ textTransform: "capitalize" }}>
            Price and countInStock should be number
          </span>,
          {
            position: "top-right",
          }
        );
      }
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
      });
    }
  };

  return (
    <Container
      sx={{ paddingY: "15px" }}
      component="form"
      onSubmit={handleSubmit(submit)}
      maxWidth="xs"
    >
      <Button
        to="/"
        sx={{
          background: "#124076",
          textTransform: "capitalize",
          marginBottom: "20px",

          color: "white",

          "&:hover": {
            background: "#00224D",
          },
        }}
        component={routerr}
      >
        Go back
      </Button>
      <Typography
        sx={{
          fontSize: { lg: "35px", xs: "20px" },
          fontWeight: "bold",
          textTransform: "capitalize",
          marginBottom: "10px",
          color: "#00224D",
        }}
      >
        Edit product
      </Typography>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <TextField
            id="outlined"
            {...register("name")}
            label="Name"
            defaultValue={data.name}
            type="text"
            variant="outlined"
            autoComplete="current-password"
          />
          <TextField
            id="outlined"
            {...register("brand")}
            label="Brand"
            defaultValue={data.brand}
            type="text"
            variant="outlined"
            autoComplete="current-password"
          />
          <TextField
            id="outlined"
            {...register("category")}
            label="Category"
            defaultValue={data.category}
            type="text"
            variant="outlined"
            autoComplete="current-password"
          />
          <TextField
            id="outlined"
            label="Description"
            {...register("description")}
            defaultValue={data.description}
            type="text"
            variant="outlined"
            autoComplete="current-password"
          />
          <TextField
            type="file"
            label="upload the image"
            name="image"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              accept: "image/*",
            }}
          />

          <TextField
            id="outlined"
            label="countInStock"
            {...register("countInStock")}
            defaultValue={data.countInStock}
            type="text"
            variant="outlined"
            autoComplete="current-password"
          />
          <TextField
            id="outlined"
            label="Price"
            {...register("price")}
            defaultValue={data.price}
            type="text"
            variant="outlined"
            autoComplete="current-password"
          />

          <Button
            sx={{
              backgroundColor: "#124076",
              "&:hover": {
                backgroundColor: "#00224D",
              },
            }}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default ProductUpdate;
