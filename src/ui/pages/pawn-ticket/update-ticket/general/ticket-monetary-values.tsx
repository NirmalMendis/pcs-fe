import { PaperOwnProps, Stack, Typography } from "@mui/material";
import { FC } from "react";
import MoneyBagIcon from "../../../../../assets/svg/money-bag.svg";
import DataCard from "../../../../../shared/components/data-card";
import useTextFormatter from "../../../../../shared/hooks/use-text-formatter";

export interface TicketMonetoryValuesProps extends PaperOwnProps {
  principalAmount?: number | null;
  serviceCharge?: number;
  darken?: boolean;
}

const TicketMonetaryValues: FC<TicketMonetoryValuesProps> = ({
  principalAmount,
  serviceCharge,
  darken,
  ...props
}) => {
  const { formatPercentage, formatRs } = useTextFormatter();

  return (
    <DataCard
      backgroundImg={MoneyBagIcon}
      highlightBackground={!principalAmount}
      darken={darken}
      {...props}
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
            {serviceCharge !== undefined && (
              <Stack>
                <Typography noWrap fontSize={14} fontWeight="bold">
                  Service Charge
                </Typography>
                <Typography
                  noWrap
                  fontSize={15}
                  color={"primary"}
                  fontWeight="bold"
                  //   color={`${revisedChanges.numberOfNights ? "red" : "primary"}`}
                >
                  {formatRs(String(serviceCharge))}
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
