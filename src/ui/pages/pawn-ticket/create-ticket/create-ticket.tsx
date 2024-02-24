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
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import usePostCreatePawnTicket, {
  PostCreatePawnTicketRequest,
} from "../../../../api/pawn-ticket/use-post-create-pawn-ticket";
import { DEFAULT_BRANCH_ID } from "../../../../constants/generic-constants";
import Backdrop from "../../../../shared/components/backdrop";
import PageTitleCard from "../../../../shared/components/page-title-card";
import { CRUItemFormValues } from "./add-item/cru-item-form";
import CRUItems from "./add-item/cru-items";
import ConfirmTicket from "./confirm-ticket";
import CreatePawnTicketForm, {
  CreatePawnTicketFormValues,
} from "./create-pawn-ticket-form";

interface ActiveStepContextProps {
  activeStep: number;
  handleNext?: () => void;
  handleBack?: () => void;
}

export interface TicketFormItem extends CRUItemFormValues {
  isSubmitted: boolean;
  uiId: number;
}

export interface TicketFormData extends CreatePawnTicketFormValues {
  customerName: string;
}

interface CreateTicketContext {
  createPawnTicketFormData?: Partial<TicketFormData>;
  setCreatePawnTicketFormData: Dispatch<
    SetStateAction<Partial<TicketFormData>>
  >;
  items?: Array<TicketFormItem>;
  setItems: Dispatch<SetStateAction<Array<TicketFormItem>>>;
}

export const createTicketSteps = [
  "Create Pawn Ticket",
  "Add items",
  "Confirm Pawn Ticket",
];

export const ActiveStepContext = createContext<ActiveStepContextProps>({
  activeStep: 0,
});

export const CreateTicketContext = createContext<CreateTicketContext>({
  setCreatePawnTicketFormData: () => null,
  setItems: () => null,
});

export const emptyItem: CRUItemFormValues & {
  isSubmitted: boolean;
  uiId: number;
} = {
  appraisedValue: 0,
  caratage: 0,
  description: "",
  pawningAmount: 0,
  weight: 0,
  isSubmitted: false,
  uiId: 0,
};

const CreateTicket = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createPawnTicketFormData, setCreatePawnTicketFormData] = useState<
    Partial<TicketFormData>
  >({});
  const [items, setItems] = useState<Array<TicketFormItem>>([emptyItem]);
  const {
    mutate: mutatePostCreatePawnTicket,
    isPending: isPendingPostCreatePawnTicket,
  } = usePostCreatePawnTicket();
  const { enqueueSnackbar } = useSnackbar();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCreatePawnTicket = () => {
    if (items && createPawnTicketFormData)
      mutatePostCreatePawnTicket(
        {
          payload: {
            ...(createPawnTicketFormData as PostCreatePawnTicketRequest),
            branchId: DEFAULT_BRANCH_ID,
            items: items,
          },
        },
        {
          onSuccess: (data) => {
            enqueueSnackbar(`Pawn ticket with id ${data.id} has been saved.`, {
              variant: "success",
            });
            if (handleNext) handleNext();
          },
        }
      );
  };

  const renderStepperContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography variant="h6">Enter Pawn Ticket Details</Typography>
            <CreatePawnTicketForm />
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6">Add Items</Typography>
            <CRUItems />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6">Confirm Pawn Ticket Details</Typography>
            <ConfirmTicket handleCreatePawnTicket={handleCreatePawnTicket} />
          </>
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
                <CreateTicketContext.Provider
                  value={{
                    createPawnTicketFormData,
                    setCreatePawnTicketFormData,
                    items,
                    setItems,
                  }}
                >
                  <Stack spacing={4}>{renderStepperContent()}</Stack>
                </CreateTicketContext.Provider>
              </ActiveStepContext.Provider>
            </>
          )}
        </Stack>
      </Grid>
      <Backdrop open={isPendingPostCreatePawnTicket} />
    </Grid>
  );
};

export default CreateTicket;
