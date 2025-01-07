import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { Box, Divider, PaperOwnProps, Stack, Typography } from "@mui/material";
import { FC } from "react";
import BasicInfoIcon from "../../../../../assets/svg/basic-info.svg";
import DataCard from "../../../../../shared/components/data-card";
import Customer from "../../../../../shared/types/customer";

export interface CustomerBasicInfoCardProps extends PaperOwnProps {
  customer?: Pick<Customer, "email" | "nicNo" | "mobileNo">;
  darken?: boolean;
}

const CustomerBasicInfoCard: FC<CustomerBasicInfoCardProps> = ({
  customer,
  darken,
  ...props
}) => {
  return (
    <DataCard
      backgroundImg={BasicInfoIcon}
      highlightBackground={!customer?.nicNo}
      darken={darken}
      {...props}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          BASIC INFO
        </Typography>
        {customer?.nicNo && (
          <Stack spacing={1} height={"100%"} justifyContent="space-between">
            <Box display="flex" sx={{ gap: 1 }}>
              <AssignmentIndIcon sx={{ color: "rgba(212, 120, 51, 0.8)" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontWeight="bold">NIC No</Typography>
                <Typography fontWeight="bold">{customer.nicNo}</Typography>
              </Stack>
            </Box>
            <Divider />
            <Box display="flex" sx={{ gap: 1 }}>
              <SmartphoneIcon sx={{ color: "rgba(180, 186, 6, 0.8)" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontWeight="bold">Phone Number</Typography>
                <Typography fontWeight="bold">{customer.mobileNo}</Typography>
              </Stack>
            </Box>
            <Divider />
            <Box display="flex" sx={{ gap: 1 }}>
              <EmailIcon sx={{ color: "rgba(161, 8, 54, 0.8)" }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontWeight="bold">Email </Typography>
                <Typography fontWeight="bold">
                  {customer.email || "-"}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        )}
      </Stack>
    </DataCard>
  );
};

export default CustomerBasicInfoCard;
