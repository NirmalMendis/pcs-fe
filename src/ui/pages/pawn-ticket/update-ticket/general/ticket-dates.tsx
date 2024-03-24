import { PaperOwnProps, Stack, Typography } from "@mui/material";
import { differenceInMonths, format } from "date-fns";
import { FC } from "react";
import TicketDatesIcon from "../../../../../assets/svg/ticket-dates.svg";
import { DD_MM_YYY_FORMAT } from "../../../../../constants/generic-constants";
import DataCard from "../../../../../shared/components/data-card";

export interface CustomerAtomicCardProps extends PaperOwnProps {
  pawnDate?: Date;
  dueDate?: Date;
  darken?: boolean;
}

const TicketDatesCard: FC<CustomerAtomicCardProps> = ({
  pawnDate,
  dueDate,
  darken,
  ...props
}) => {
  return (
    <DataCard
      backgroundImg={TicketDatesIcon}
      highlightBackground={!pawnDate}
      darken={darken}
      {...props}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          Dates
        </Typography>
        {pawnDate && dueDate && (
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Stack>
              <Typography noWrap fontSize={14} fontWeight="bold">
                Pawn Date
              </Typography>
              <Typography
                noWrap
                fontSize={15}
                color={"primary"}
                //  color={`${revisedChanges.checkInDateTime ? "red" : "primary"}`}
                fontWeight="bold"
              >
                {format(pawnDate, DD_MM_YYY_FORMAT)}
              </Typography>
            </Stack>
            <Stack>
              <Typography noWrap fontSize={14} fontWeight="bold">
                Due Date
              </Typography>
              <Typography
                noWrap
                fontSize={15}
                color={"primary"}
                //   color={`${revisedChanges.checkOutDateTime ? "red" : "primary"}`}
                fontWeight="bold"
              >
                {format(dueDate, DD_MM_YYY_FORMAT)}
              </Typography>
            </Stack>
            <Stack>
              <Typography noWrap fontSize={14} fontWeight="bold">
                Months
              </Typography>
              <Typography
                noWrap
                fontSize={15}
                color={"primary"}
                //   color={`${revisedChanges.numberOfNights ? "red" : "primary"}`}
              >
                {differenceInMonths(dueDate, pawnDate)}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </DataCard>
  );
};

export default TicketDatesCard;
