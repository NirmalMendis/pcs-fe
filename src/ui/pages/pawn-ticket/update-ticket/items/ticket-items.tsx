import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import useGetItemsByPawnTicketId from "../../../../../api/item/use-get-items-by-ticketId";
import { DEFAULT_PAGE_SIZE } from "../../../../../constants/generic-constants";
import { PawnTicket } from "../../../../../shared/types/pawn-ticket";
import TicketItemsTable from "./ticket-items-table";

export type TicketItemsTabProps = Pick<PawnTicket, "id">;

const TicketItemsTab: FC<TicketItemsTabProps> = ({ id }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });

  const {
    data: items,
    isFetching: isFetchingGetItemsByPawnTicketId,
    refetch,
  } = useGetItemsByPawnTicketId({
    id: id,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  useEffect(() => {
    refetch();
  }, [refetch, paginationModel.page]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TicketItemsTable
          items={items?.pageData}
          totalItems={items?.pager.totalItems}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          isFetching={isFetchingGetItemsByPawnTicketId}
        />
      </Grid>
    </Grid>
  );
};

export default TicketItemsTab;
