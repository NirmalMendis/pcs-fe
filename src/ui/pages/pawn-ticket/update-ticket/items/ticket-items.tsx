import { Grid } from "@mui/material";
import { FC } from "react";
import { Item } from "../../../../../shared/types/item";
import { TicketFormItem } from "../../create-ticket/create-ticket";
import TicketItemsTable from "./ticket-items-table";

export interface TicketItemsTabProps {
  items?: Array<Item & Partial<TicketFormItem>>;
}

const TicketItemsTab: FC<TicketItemsTabProps> = ({ items }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {items ? <TicketItemsTable items={items} /> : null}
      </Grid>
    </Grid>
  );
};

export default TicketItemsTab;
