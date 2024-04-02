import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { Box, Grid, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { FC, useState } from "react";
import useGetInterestsByPawnTicketId from "../../../../../api/interest/use-get-interest-by-ticketId";
import { StatusColors } from "../../../../../constants/color-constants";
import {
  DEFAULT_PAGE_SIZE,
  MUI_DATAGRID_DEFAULT_HEIGHT,
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT,
} from "../../../../../constants/generic-constants";
import NoDataGrid from "../../../../../shared/components/no-data-grid";
import CustomPagination from "../../../../../shared/components/pagination";
import useTextFormatter from "../../../../../shared/hooks/use-text-formatter";
import { PawnTicket } from "../../../../../shared/types/pawn-ticket";

export type InterestsProps = Pick<PawnTicket, "id">;

const TicketInterestsSchedule: FC<InterestsProps> = ({ id }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });

  const { data, isFetching: isFetchingGetInterestByTicketId } =
    useGetInterestsByPawnTicketId({
      id,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    });

  const { formatRs } = useTextFormatter();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      width: 50,
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell: () => {
        return <LabelImportantIcon sx={{ color: "success.light" }} />;
      },
    },
    {
      field: "fromDate",
      headerName: "From",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "toDate",
      headerName: "To",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "paymentMonth",
      headerName: "Payment Month",
      headerAlign: "center",
      align: "center",
      width: 200,
      valueGetter: (params) => {
        return format(new Date(params.row.toDate), "LLLL");
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      headerAlign: "center",
      align: "right",
      flex: 1,
      renderCell: (params) => {
        if (formatRs) return formatRs(String(params.value));
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              border: "1px solid",
              borderColor: StatusColors[params.value].borderColor,
              p: "5px",
              pt: "5px",
              pb: "5px",
              borderRadius: "3px",
              width: "100%",
              textAlign: "center",
              color: StatusColors[params.value].color,
              backgroundColor: StatusColors[params.value].backgroundColor,
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DataGrid
          rows={data?.pageData || []}
          rowCount={data?.pager.totalItems || data?.pageData?.length || 0}
          rowHeight={MUI_DATAGRID_DEFAULT_ROW_HEIGHT}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[DEFAULT_PAGE_SIZE]}
          paginationMode={"server"}
          sx={{
            height: MUI_DATAGRID_DEFAULT_HEIGHT,
            border: "none",
            backgroundColor: "inherit",
            padding: 1,
            "--DataGrid-overlayHeight": "200px",
          }}
          loading={isFetchingGetInterestByTicketId}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: NoDataGrid,
            pagination: CustomPagination,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TicketInterestsSchedule;
