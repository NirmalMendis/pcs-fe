import { AccountCircle } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import CustomerIcon from "../../../assets/svg/customer.svg";
import DataCard from "../../../shared/components/data-card";

export interface CustomerAtomicCardProps {
  name?: string;
  email?: string;
}

const CustomerAtomicCard: FC<CustomerAtomicCardProps> = ({ name, email }) => {
  return (
    <DataCard backgroundImg={CustomerIcon} highlightBackground={!name}>
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          Customer
        </Typography>
        {name && (
          <Stack direction="row" spacing={1}>
            <AccountCircle color="primary" sx={{ fontSize: 40 }} />
            <Stack>
              <Typography
                noWrap
                fontSize={14}
                fontWeight="bold"
                color={"primary"}
                //  color={`${revisedChanges.guestId ? "red" : "primary"}`}
              >
                {name}
              </Typography>
              <Typography noWrap fontSize={12}>
                {email}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </DataCard>
  );
};

export default CustomerAtomicCard;
