import { Stack, Alert, Button } from "@mui/material";
import { Link as routerr } from "react-router-dom";
function Error(props) {
  return (
    <Stack
      direction={"column"}
      spacing={4}
      sx={{
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "15px",
      }}
    >
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
      <Alert sx={{ fontSize: "20px" }} variant="filled" severity="error">
        {props?.message?.data.message || "error"}
      </Alert>
    </Stack>
  );
}

export default Error;
