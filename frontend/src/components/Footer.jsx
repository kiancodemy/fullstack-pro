import { Box, Typography } from "@mui/material";
function Footer() {
  const currenct = new Date().getFullYear();
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
          fontSize: { xs: "14px", md: "18px" },
          paddingY: "15px",
        }}
      >
        Shop &copy; {currenct}
      </Typography>
    </Box>
  );
}

export default Footer;
