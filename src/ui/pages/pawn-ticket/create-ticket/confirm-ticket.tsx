import SaveIcon from "@mui/icons-material/Save";
import { Grid, Paper } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import useGetCustomerById from "../../../../api/customer/use-get-customer-by-id";
import useGetCalculateMonthlyInterest from "../../../../api/pawn-ticket/use-get-calculate-monthly-interest";
import CustomerAtomicCard from "../../customer/customer-atomic-card";
import TicketDatesCard from "../update-ticket/general/ticket-dates";
import TicketMonetaryValues from "../update-ticket/general/ticket-monetary-values";
import TicketItemsTable from "../update-ticket/items/ticket-items-table";
import { CreateTicketContext } from "./create-ticket";
import StepperBtns from "./stepper-btns";

export interface ConfirmTicketProps {
  handleCreatePawnTicket: () => void;
}
const ConfirmTicket: FC<ConfirmTicketProps> = ({ handleCreatePawnTicket }) => {
  const { createPawnTicketFormData, setCreatePawnTicketFormData } =
    useContext(CreateTicketContext);
  const { items } = useContext(CreateTicketContext);

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
  const calculatePrincipalAmount = () => {
    const total = items?.reduce((acc, item) => acc + item.pawningAmount, 0);
    return total;
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
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomerAtomicCard
            name={createPawnTicketFormData?.customerName}
            darken
            email={customerData?.email}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TicketDatesCard
          dueDate={createPawnTicketFormData?.dueDate}
          pawnDate={createPawnTicketFormData?.pawnDate}
          darken
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TicketMonetaryValues
          principalAmount={createPawnTicketFormData?.principalAmount}
          interestRate={createPawnTicketFormData?.interestRate}
          monthlyInterest={monthlyInterestData?.monthlyInterest}
          darken
        />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ backgroundColor: "ternary.main", p: 1 }} elevation={0}>
          {items ? <TicketItemsTable items={items} /> : null}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <StepperBtns
          actionButtonProps={{
            onClick: handleCreatePawnTicket,
            type: "button",
            startIcon: <SaveIcon color="secondary" />,
          }}
          finalActionName="Confirm and Submit Ticket"
        />
      </Grid>
    </Grid>
  );
};

export default ConfirmTicket;
