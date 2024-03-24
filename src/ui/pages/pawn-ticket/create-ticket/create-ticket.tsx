import {
  Divider,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { addMonths } from "date-fns";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import usePostCreatePawnTicket, {
  PostCreatePawnTicketRequest,
} from "../../../../api/pawn-ticket/use-post-create-pawn-ticket";
import usePostDraftTicketInvoice from "../../../../api/pawn-ticket/use-post-draft-ticket-invoice";
import Backdrop from "../../../../shared/components/backdrop";
import PageTitleCard from "../../../../shared/components/page-title-card";
import AddItems from "./add-item/add-items";
import { CRUItemFormValues } from "./add-item/cru-item-form";
import ConfirmTicket from "./confirm-ticket";
import CreatePawnTicketForm, {
  CreatePawnTicketFormValues,
} from "./create-pawn-ticket-form";
import TicketCompleted from "./ticket-completed";

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
  "Add items",
  "Enter Pawn Ticket Details",
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

export const initialTicketFormData = {
  pawnDate: new Date(),
  dueDate: addMonths(new Date(), 1),
};
const CreateTicket = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createPawnTicketFormData, setCreatePawnTicketFormData] = useState<
    Partial<TicketFormData>
  >(initialTicketFormData);
  const [items, setItems] = useState<Array<TicketFormItem>>([emptyItem]);

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
    if (items && createPawnTicketFormData) {
      const createPawnTicketFormDataExcludingPrincpal = {
        ...createPawnTicketFormData,
      };
      delete createPawnTicketFormDataExcludingPrincpal.principalAmount;
      mutatePostCreatePawnTicket(
        {
          payload: {
            ...(createPawnTicketFormDataExcludingPrincpal as PostCreatePawnTicketRequest),
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
    }
  };

  const generateDraftInvoice = () => {
    if (createPawnTicketFormData.customerId)
      mutatePostTicketInvoicePdf({
        payload: {
          customerId: createPawnTicketFormData.customerId,
          items: items.map((item) => ({
            weight: item.weight,
            pawningAmount: item.pawningAmount,
            description: item.description,
            appraisedValue: item.appraisedValue,
          })),
          pawnTicket: {
            dueDate: createPawnTicketFormData.dueDate as Date,
            interestRate: createPawnTicketFormData.interestRate as number,
            pawnDate: createPawnTicketFormData.pawnDate as Date,
            principalAmount: createPawnTicketFormData.principalAmount as number,
            serviceCharge: createPawnTicketFormData.serviceCharge as number,
          },
        },
      });
  };

  const renderStepperContent = () => {
    switch (activeStep) {
      case 0:
        return [
          <Typography key={"item-title"} variant="h6" sx={{ mb: 1 }}>
            Add Items to Ticket
          </Typography>,
          <AddItems key={"add-items"} />,
        ];
      case 1:
        return [
          <Typography key={"ticket-title"} variant="h6" sx={{ mb: 1 }}>
            Enter Pawn Ticket Details
          </Typography>,
          <CreatePawnTicketForm
            key={"create-ticket-form"}
            generateDraftInvoice={generateDraftInvoice}
          />,
        ];
      case 2:
        return [
          <ConfirmTicket
            key={"ticket-confirmation-content"}
            handleCreatePawnTicket={handleCreatePawnTicket}
            invoicePDFData={draftInvoicePDFData as File}
            isLoadingPdf={isPendingPostDraftTicketInvoicePdf}
          />,
        ];
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
          {activeStep === createTicketSteps.length &&
          createPawnTicketData &&
          createPawnTicketData.invoiceId !== undefined ? (
            <TicketCompleted
              handleReset={handleReset}
              invoiceID={createPawnTicketData.invoiceId}
            />
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
                  <Stack
                    spacing={2}
                    divider={<Divider orientation="horizontal" />}
                  >
                    {renderStepperContent()}
                  </Stack>
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
