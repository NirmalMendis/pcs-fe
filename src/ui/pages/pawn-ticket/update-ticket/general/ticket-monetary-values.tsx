import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import MoneyBagIcon from "../../../../../assets/svg/money-bag.svg";
import DataCard from "../../../../../shared/components/data-card";
import useTextFormatter from "../../../../../shared/hooks/use-text-formatter";

export interface TicketMonetoryValuesProps {
  principalAmount?: number | null;
  interestRate?: number;
  monthlyInterest?: number;
  darken?: boolean;
}

const TicketMonetaryValues: FC<TicketMonetoryValuesProps> = ({
  principalAmount,
  interestRate,
  monthlyInterest,
  darken,
}) => {
  const { formatPercentage, formatRs } = useTextFormatter();

  return (
    <DataCard
      backgroundImg={MoneyBagIcon}
      highlightBackground={!principalAmount}
      darken={darken}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          Monetary
        </Typography>
        {formatRs && formatPercentage ? (
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {principalAmount !== undefined && (
              <Stack>
                <Typography noWrap fontSize={14} fontWeight="bold">
                  Principal Amount
                </Typography>
                <Typography
                  noWrap
                  fontSize={15}
                  color={"primary"}
                  //  color={`${revisedChanges.checkInDateTime ? "red" : "primary"}`}
                  fontWeight="bold"
                >
                  {formatRs(String(principalAmount))}
                </Typography>
              </Stack>
            )}
            {interestRate != undefined && (
              <Stack>
                <Typography noWrap fontSize={14} fontWeight="bold">
                  Interest Rate
                </Typography>
                <Typography
                  noWrap
                  fontSize={15}
                  color={"primary"}
                  //   color={`${revisedChanges.checkOutDateTime ? "red" : "primary"}`}
                  fontWeight="bold"
                >
                  {formatPercentage(String(interestRate))}
                </Typography>
              </Stack>
            )}
            {monthlyInterest !== undefined && (
              <Stack>
                <Typography noWrap fontSize={14} fontWeight="bold">
                  Monthly Interest
                </Typography>
                <Typography
                  noWrap
                  fontSize={15}
                  color={"primary"}
                  fontWeight="bold"
                  //   color={`${revisedChanges.numberOfNights ? "red" : "primary"}`}
                >
                  {formatRs(String(monthlyInterest))}
                </Typography>
              </Stack>
            )}
          </Stack>
        ) : null}
      </Stack>
    </DataCard>
  );
};

export default TicketMonetaryValues;
