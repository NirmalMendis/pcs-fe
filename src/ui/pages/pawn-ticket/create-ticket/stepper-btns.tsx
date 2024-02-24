import { Box, Button, ButtonProps } from "@mui/material";
import React, { FC, useContext } from "react";
import { ActiveStepContext, createTicketSteps } from "./create-ticket";

export interface StepperBtnsProps {
  finalActionName?: string;
  actionButtonProps?: ButtonProps;
}

const StepperBtns: FC<StepperBtnsProps> = ({
  finalActionName = "Finish",
  actionButtonProps,
}) => {
  const { activeStep, handleBack } = useContext(ActiveStepContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button {...actionButtonProps}>
        {activeStep === createTicketSteps.length - 1 ? finalActionName : "Next"}
      </Button>
    </Box>
  );
};

export default StepperBtns;
