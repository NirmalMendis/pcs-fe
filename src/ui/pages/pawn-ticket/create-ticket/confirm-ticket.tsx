import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Theme } from "@mui/material";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useGetCustomerById from "../../../../api/customer/use-get-customer-by-id";
import useGetCalculateMonthlyInterest from "../../../../api/pawn-ticket/use-get-calculate-monthly-interest";
import getTransformedItems from "../../../../shared/helper/get-tramsformed-items";
import CustomerAtomicCard from "../../customer/customer-atomic-card";
import { CreateTicketContext } from "../all-tickets/all-pawn-tickets";
import TicketDatesCard from "../update-ticket/general/ticket-dates";
import TicketInterests from "../update-ticket/general/ticket-interests";
import TicketMonetaryValues from "../update-ticket/general/ticket-monetary-values";
import TicketItemsTable, {
  TicketItemsTableProps,
} from "../update-ticket/items/ticket-items-table";
import InvoicePreview from "./invoice-preview";
import StepperBtns from "./stepper-btns";

export interface ConfirmTicketProps {
  handleCreatePawnTicket: () => void;
  invoicePDFData?: File;
  isLoadingPdf: boolean;
}
const ConfirmTicket: FC<ConfirmTicketProps> = ({
  handleCreatePawnTicket,
  invoicePDFData,
  isLoadingPdf,
}) => {
  const { createPawnTicketFormData, setCreatePawnTicketFormData, items } =
    useContext(CreateTicketContext);
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );
  const printButtonRef = useRef<HTMLDivElement>(null);
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(largeScreen);

  const { data: monthlyInterestData } = useGetCalculateMonthlyInterest(
    {
      interestRate: createPawnTicketFormData?.interestRate || 0,
      principalAmount: createPawnTicketFormData?.principalAmount || 0,
    },
    createPawnTicketFormData?.interestRate !== undefined &&
      createPawnTicketFormData.principalAmount !== undefined
  );

  const { data: customerData } = useGetCustomerById(
    {
      id: createPawnTicketFormData?.customerId as number,
    },
    createPawnTicketFormData?.customerId !== undefined
  );

  const calculatePrincipalAmount = useCallback(() => {
    const total = items?.reduce((acc, item) => acc + item.pawningAmount, 0);
    return total;
  }, [items]);

  const handleInvoiceVisibility = () => {
    setIsInvoiceVisible((prev) => !prev);
  };

  useEffect(() => {
    if (
      createPawnTicketFormData?.principalAmount === undefined ||
      createPawnTicketFormData.principalAmount === null
    )
      setCreatePawnTicketFormData((prev) => ({
        ...prev,
        principalAmount: calculatePrincipalAmount(),
      }));
  }, [
    calculatePrincipalAmount,
    createPawnTicketFormData?.principalAmount,
    setCreatePawnTicketFormData,
  ]);

  useEffect(() => {
    // Focus on the button element when the component is loaded
    if (printButtonRef.current && largeScreen) {
      printButtonRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [printButtonRef, largeScreen, isLoadingPdf]);

  return (
    <Stack
      divider={<Divider orientation="horizontal" />}
      spacing={2}
      ref={printButtonRef}
    >
      <Box display={"flex"} justifyContent={"space-between"} sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Confirm Pawn Ticket Details
        </Typography>
        <Button
          startIcon={
            isInvoiceVisible ? (
              <VisibilityOffIcon color="secondary" />
            ) : (
              <VisibilityIcon color="secondary" />
            )
          }
          color="violet"
          sx={{ justifyContent: "start" }}
          onClick={handleInvoiceVisibility}
        >
          {isInvoiceVisible ? `Hide Invoice` : "View Invoice"}
        </Button>
      </Box>
      <Grid container>
        <Grid
          item
          xs
          md={isInvoiceVisible ? 6 : 12}
          sx={{ pl: "0px !important", pb: 2 }}
          justifyContent={"space-between"}
          display={{ xs: isInvoiceVisible ? "none" : "flex", md: "flex" }}
          flexDirection={"column"}
        >
          <Stack
            width={"100%"}
            divider={<Divider orientation="horizontal" />}
            sx={{ pl: 1, pr: 1 }}
          >
            <CustomerAtomicCard
              name={createPawnTicketFormData?.customerName}
              email={customerData?.email}
              sx={{ height: "fit-content" }}
            />
            <TicketDatesCard
              dueDate={createPawnTicketFormData?.dueDate}
              pawnDate={createPawnTicketFormData?.pawnDate}
              sx={{ height: "fit-content" }}
            />
            <TicketMonetaryValues
              principalAmount={createPawnTicketFormData?.principalAmount}
              serviceCharge={createPawnTicketFormData?.serviceCharge || 0}
              sx={{ height: "fit-content" }}
            />
            <TicketInterests
              interestRate={createPawnTicketFormData?.interestRate}
              monthlyInterest={monthlyInterestData?.monthlyInterest}
            />
            <Stack component={Paper} sx={{ p: 1 }} elevation={0} spacing={1}>
              <Typography variant="h6">Items</Typography>
              {items ? (
                <TicketItemsTable
                  items={
                    getTransformedItems(
                      items.map((item) => ({
                        ...item,
                        id: item.uiId,
                      }))
                    ) as TicketItemsTableProps["items"]
                  }
                />
              ) : null}
            </Stack>
            <Grid
              item
              xs={12}
              sx={{ pl: 1, pr: 1 }}
              justifyContent={"end"}
              display={"flex"}
              flexDirection={"column"}
            >
              <StepperBtns
                actionButtonProps={{
                  onClick: handleCreatePawnTicket,
                  type: "button",
                  startIcon: <SaveIcon color="secondary" />,
                }}
                finalActionName="Confirm and Submit Ticket"
              />
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} display={isInvoiceVisible ? "block" : "none"}>
          <InvoicePreview
            invoicePDFData={invoicePDFData}
            isLoadingPdf={isLoadingPdf}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ConfirmTicket;
