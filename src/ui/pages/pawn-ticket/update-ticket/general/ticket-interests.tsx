import { PaperOwnProps, Stack, Typography } from "@mui/material";
import { FC } from "react";
import InterestIcon from "../../../../../assets/svg/interest-logo.svg";
import DataCard from "../../../../../shared/components/data-card";
import useTextFormatter from "../../../../../shared/hooks/use-text-formatter";

export interface TicketMonetoryValuesProps extends PaperOwnProps {
  interestRate?: number;
  monthlyInterest?: number;
  darken?: boolean;
}

const TicketInterests: FC<TicketMonetoryValuesProps> = ({
  interestRate,
  monthlyInterest,
  darken,
  ...props
}) => {
  const { formatPercentage, formatRs } = useTextFormatter();

  return (
    <DataCard
      backgroundImg={InterestIcon}
      highlightBackground={interestRate === undefined}
      darken={darken}
      {...props}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          Interest
        </Typography>
        {formatRs && formatPercentage ? (
          <Stack direction="row" spacing={1} justifyContent="space-between">
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

export default TicketInterests;
