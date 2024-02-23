import { Grid } from "@mui/material";
import { FC } from "react";
import { PawnTicket } from "../../../../shared/types/pawn-ticket";
import CustomerAtomicCard from "../../customer/customer-atomic-card";
import TicketDatesCard from "./ticket-dates";

export interface TicketGeneralTabProps {
  pawnTicketData?: PawnTicket;
}

const TicketGeneralTab: FC<TicketGeneralTabProps> = ({ pawnTicketData }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={4}>
        <CustomerAtomicCard
          name={pawnTicketData?.customer.name}
          email={pawnTicketData?.customer.email}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TicketDatesCard
          dueDate={pawnTicketData?.dueDate}
          pawnDate={pawnTicketData?.pawnDate}
        />
      </Grid>
    </Grid>
  );
};

export default TicketGeneralTab;
