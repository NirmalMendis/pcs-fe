import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Divider, PaperOwnProps, Stack, Typography } from "@mui/material";
import { FC } from "react";
import LocationIcon from "../../../../../assets/svg/location-icon.svg";
import DataCard from "../../../../../shared/components/data-card";
import Customer from "../../../../../shared/types/customer";

export interface CustomerAddressCardProps extends PaperOwnProps {
  customer?: Pick<
    Customer,
    "addressLine1" | "addressLine2" | "addressLine3" | "city" | "postalCode"
  >;
  darken?: boolean;
}

const CustomerAddressCard: FC<CustomerAddressCardProps> = ({
  customer,
  darken,
  ...props
}) => {
  return (
    <DataCard
      backgroundImg={LocationIcon}
      highlightBackground={!customer?.addressLine1}
      darken={darken}
      {...props}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          ADDRESS
        </Typography>
        {customer?.addressLine1 && (
          <Stack spacing={1} height={"100%"} justifyContent="space-between">
            <Box display="flex" sx={{ gap: 1 }}>
              <LocationOnIcon sx={{ color: "rgba(117, 117, 117, 0.8)" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontWeight="bold">Address</Typography>
                <Stack
                  justifyContent="space-between"
                  width="100%"
                  textAlign={"end"}
                >
                  <Typography fontWeight="bold">
                    {customer.addressLine1}
                  </Typography>
                  <Typography fontWeight="bold">
                    {customer.addressLine2}
                  </Typography>
                  <Typography fontWeight="bold">
                    {customer.addressLine3}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Divider />
            <Box display="flex" sx={{ gap: 1 }}>
              <LocationCityIcon sx={{ color: "rgba(45, 71, 157, 0.8)" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontWeight="bold">City</Typography>
                <Typography fontWeight="bold">{customer.city}</Typography>
              </Stack>
            </Box>
            <Divider />
            <Box display="flex" sx={{ gap: 1 }}>
              <MailOutlineIcon sx={{ color: "rgba(203, 29, 215, 0.8)" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontWeight="bold">Postal Code </Typography>
                <Typography fontWeight="bold">
                  {customer.postalCode || "-"}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        )}
      </Stack>
    </DataCard>
  );
};

export default CustomerAddressCard;
