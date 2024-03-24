import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

function Loading() {
  return (
    <Stack
      direction={"column"}
      spacing={4}
      sx={{ height: "90vh", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress sx={{ color: "#124076" }} size={80} color="inherit" />
      <Typography
        sx={{
          textTransform: "capitalize",
          color: "#124076",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        loading
      </Typography>
    </Stack>
  );
}

export default Loading;
