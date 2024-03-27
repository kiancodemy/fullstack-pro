import { Button, Container, TextField, Box } from "@mui/material";
function Login() {
  return (
    <Container sx={{ marginTop: "50px" }} component="form" autoComplete="off">
      <Box
        sx={{
          maxWidth: "500px",

          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <TextField
          id="outlined-password-input"
          label="Name"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          required
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          required
          type="password"
          autoComplete="current-password"
          helperText={
            <span
              style={{
                textTransform: "capitalize",
                color: "#aaa",
              }}
            >
              it should be between 5 to 8 character
            </span>
          }
        />
        <Button variant="contained" sx={{ alignSelf: "start" }}>
          sign in{" "}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
