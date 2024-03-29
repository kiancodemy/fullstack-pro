import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Sign in ", "Shipping", "Payment", "Place Order"];
export default function CheckoutNavbar({ step }) {
  return (
    <Box
      sx={{
        width: "100%",

        paddingY: "10px",
      }}
    >
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
