import { Grid, Pagination } from "@mui/material";
import { FC, useEffect, useState } from "react";
import useGetItemsByPawnTicketId from "../../../../../api/item/use-get-items-by-ticketId";
import { DEFAULT_PAGE_SIZE } from "../../../../../constants/generic-constants";
import { PawnTicket } from "../../../../../shared/types/pawn-ticket";
import TicketItemsTable from "./ticket-items-table";

export type TicketItemsTabProps = Pick<PawnTicket, "id">;

const TicketItemsTab: FC<TicketItemsTabProps> = ({ id }) => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data: items, refetch } = useGetItemsByPawnTicketId({
    id: id,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {items ? <TicketItemsTable items={items.pageData} /> : null}
      </Grid>
      {items?.pageData.length ? (
        <Grid item xs={12}>
          <Pagination
            count={items?.pager.totalPages}
            page={page}
            onChange={handleChange}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default TicketItemsTab;
