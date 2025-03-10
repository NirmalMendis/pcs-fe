import Grid from "@mui/material/Unstable_Grid2";
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
      <Grid xs={12}>
        <TicketItemsTable
          items={items?.pageData.map((item) => ({
            appraisedValue: item.appraisedValue,
            description: item.description,
            pawningAmount: item.pawningAmount,
            id: item.id,
            itemDetails:
              item.itemDetails?.map((detail) => ({
                type: detail.type,
                value: detail.value,
              })) || [],
          }))}
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
