import { Box, Button } from "@mui/material";
import React, { FC, useContext } from "react";
import { ActiveStepContext, createTicketSteps } from "./create-ticket";

export interface StepperBtnsProps {
  handleAction?: () => boolean;
  disableAction?: boolean;
}

const StepperBtns: FC<StepperBtnsProps> = ({ handleAction, disableAction }) => {
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
      <Button onClick={handleAction} type="submit" disabled={disableAction}>
        {activeStep === createTicketSteps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
};

export default StepperBtns;
