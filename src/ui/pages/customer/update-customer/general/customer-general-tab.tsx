import { Grid } from "@mui/material";
import { FC } from "react";
import Customer from "../../../../../shared/types/customer";
import CustomerAtomicCard from "../../customer-atomic-card";
import CustomerAddressCard from "./customer-address-card";
import CustomerBasicInfoCard from "./customer-basic-info-card";

export interface CustomerGeneralTabProps {
  customer?: Customer;
}
const CustomerGeneralTab: FC<CustomerGeneralTabProps> = ({ customer }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={4}>
        <CustomerAtomicCard customer={customer} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomerBasicInfoCard customer={customer} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomerAddressCard customer={customer} />
      </Grid>
    </Grid>
  );
};

export default CustomerGeneralTab;
