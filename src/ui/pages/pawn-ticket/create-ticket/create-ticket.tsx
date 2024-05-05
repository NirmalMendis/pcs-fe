import {
  Box,
  Divider,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "notistack";
import { createContext, useContext, useState } from "react";
import usePostCreatePawnTicket, {
  PostCreatePawnTicketRequest,
} from "../../../../api/pawn-ticket/use-post-create-pawn-ticket";
import usePostDraftTicketInvoice from "../../../../api/pawn-ticket/use-post-draft-ticket-invoice";
import Backdrop from "../../../../shared/components/backdrop";
import PageTitleCard from "../../../../shared/components/page-title-card";
import getTransformedItems from "../../../../shared/helper/get-tramsformed-items";
import getPeriodInMonths from "../../../../shared/helper/getPeriodInMonths";
import { TimePeriod } from "../../../../shared/types/generic";
import {
  CreateTicketContext,
  TicketFormData,
  TicketFormItem,
  emptyItem,
  initialTicketFormData,
} from "../all-tickets/all-pawn-tickets";
import AddItems from "./add-item/add-items";
import ConfirmTicket from "./confirm-ticket";
import CreatePawnTicketForm, {
  CreatePawnTicketFormValues,
} from "./create-pawn-ticket-form";
import StepperBtns from "./stepper-btns";
import TicketCompleted from "./ticket-completed";

interface ActiveStepContextProps {
  activeStep: number;
  handleNext?: () => void;
  handleBack?: () => void;
}

export const createTicketSteps = [
  "Add items",
  "Enter Pawn Ticket Details",
  "Confirm Pawn Ticket",
];

export const ActiveStepContext = createContext<ActiveStepContextProps>({
  activeStep: 0,
});

const CreateTicket = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    createPawnTicketFormData,
    setCreatePawnTicketFormData,
    items,
    setItems,
  } = useContext(CreateTicketContext);

  const {
    data: createPawnTicketData,
    mutate: mutatePostCreatePawnTicket,
    isPending: isPendingPostCreatePawnTicket,
  } = usePostCreatePawnTicket();

  const {
    data: draftInvoicePDFData,
    mutate: mutatePostTicketInvoicePdf,
    isPending: isPendingPostDraftTicketInvoicePdf,
  } = usePostDraftTicketInvoice();

  const { enqueueSnackbar } = useSnackbar();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setCreatePawnTicketFormData(initialTicketFormData);
    setItems([emptyItem]);
    setActiveStep(0);
  };

  const handleCreatePawnTicket = () => {
    const transformedItems = getTransformedItems(items);
    if (transformedItems && createPawnTicketFormData) {
      const createPawnTicketFormDataExcludingPrincpal = {
        ...createPawnTicketFormData,
      };
      delete createPawnTicketFormDataExcludingPrincpal.principalAmount;
      mutatePostCreatePawnTicket(
        {
          payload: {
            ...(createPawnTicketFormDataExcludingPrincpal as PostCreatePawnTicketRequest),
            periodInMonths: getPeriodInMonths(
              createPawnTicketFormDataExcludingPrincpal.periodType as TimePeriod,
              createPawnTicketFormDataExcludingPrincpal.periodQuantity
            ),
            items: transformedItems,
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
    }
  };

  const generateDraftInvoice = (
    createPawnTicketFormData: Partial<TicketFormData>,
    items: TicketFormItem[] | undefined
  ) => {
    const transformedItems = getTransformedItems(items);
    if (createPawnTicketFormData?.customerId && transformedItems)
      mutatePostTicketInvoicePdf({
        payload: {
          customerId: createPawnTicketFormData.customerId,
          items: transformedItems,
          pawnTicket: {
            periodInMonths: getPeriodInMonths(
              createPawnTicketFormData.periodType as TimePeriod,
              createPawnTicketFormData.periodQuantity
            ),
            interestRate: createPawnTicketFormData.interestRate as number,
            pawnDate: createPawnTicketFormData.pawnDate as Date,
            principalAmount: createPawnTicketFormData.principalAmount as number,
            serviceCharge: createPawnTicketFormData.serviceCharge as number,
          },
        },
      });
  };

  const onSubmit = (data: CreatePawnTicketFormValues) => {
    if (setCreatePawnTicketFormData)
      setCreatePawnTicketFormData((prev) => ({
        ...prev,
        ...data,
      }));
    generateDraftInvoice(data, items);
    if (handleNext) handleNext();
  };

  const getActionButtons = (isValid: boolean) => {
    return (
      <StepperBtns
        actionButtonProps={{
          disabled: !isValid,
          type: "submit",
        }}
      />
    );
  };

  const renderStepperContent = () => {
    //need to keep all forms mounted, else forms will reset when moving back
    let displayAddTickets = "none";
    let displayPawnTicketForm = "none";
    let displayConfirmTicket = "none";
    switch (activeStep) {
      case 0:
        displayAddTickets = "block";
        break;
      case 1:
        displayPawnTicketForm = "block";
        break;
      case 2:
        displayConfirmTicket = "block";
        break;
    }

    return (
      <Box>
        <Stack
          sx={{ display: displayAddTickets }}
          divider={<Divider orientation="horizontal" />}
          spacing={2}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Add Items to Ticket
          </Typography>
          <AddItems />
        </Stack>
        <Stack
          sx={{ display: displayPawnTicketForm }}
          divider={<Divider orientation="horizontal" />}
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            Enter Pawn Ticket Details
          </Typography>
          <CreatePawnTicketForm
            onSubmit={onSubmit}
            items={items?.map((item) => item.pawningAmount)}
            createPawnTicketFormData={createPawnTicketFormData}
            getActionButtons={getActionButtons}
          />
        </Stack>
        <Box sx={{ display: displayConfirmTicket }}>
          <ConfirmTicket
            handleCreatePawnTicket={handleCreatePawnTicket}
            invoicePDFData={draftInvoicePDFData as File}
            isLoadingPdf={isPendingPostDraftTicketInvoicePdf}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Grid container spacing={1.5}>
      <Grid xs={12}>
        <PageTitleCard>
          <Typography variant="h5">Create Pawn Ticket</Typography>
        </PageTitleCard>
      </Grid>
      <Grid xs={12}>
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
          {activeStep === createTicketSteps.length &&
          createPawnTicketData &&
          createPawnTicketData.invoiceId !== undefined ? (
            <TicketCompleted
              handleReset={handleReset}
              invoiceID={createPawnTicketData.invoiceId}
              pawnTicketId={createPawnTicketData.id}
            />
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
      <Backdrop open={isPendingPostCreatePawnTicket} />
    </Grid>
  );
};

export default CreateTicket;
