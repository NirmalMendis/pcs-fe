import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { createContext, useState } from "react";
import PageTitleCard from "../../../../shared/components/page-title-card";
import CreatePawnTicketForm from "./create-pawn-ticket-form";

interface ActiveStepContextProps {
  activeStep: number;
  handleNext?: () => void;
  handleBack?: () => void;
}

export const ActiveStepContext = createContext<ActiveStepContextProps>({
  activeStep: 0,
});

export const createTicketSteps = ["Create Pawn Ticket", "Add items"];

const CreateTicket = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepperContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack spacing={4}>
            <Typography variant="h6">Enter Pawn Ticket Details</Typography>
            <CreatePawnTicketForm />
          </Stack>
        );
    }
  };

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12}>
        <PageTitleCard>
          <Typography variant="h5">Create Pawn Ticket</Typography>
        </PageTitleCard>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ width: "100%", p: 2 }} spacing={4} component={Paper}>
          <Stepper activeStep={activeStep}>
            {createTicketSteps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === createTicketSteps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <ActiveStepContext.Provider
                value={{ activeStep, handleNext, handleBack }}
              >
                {renderStepperContent()}
              </ActiveStepContext.Provider>
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CreateTicket;
