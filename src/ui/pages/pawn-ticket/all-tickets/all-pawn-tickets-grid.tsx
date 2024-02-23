import { Box, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import useGetAllPawnTickets from "../../../../api/pawn-ticket/use-get-all-pawn-tickets";
import { DEFAULT_PAGE_SIZE } from "../../../../constants/generic-constants";
import GridToolBar from "../../../../shared/components/grid-tool-bar";
import renderCellExpand from "../../../../shared/components/render-cell-expand";

const AllPawnTicketsDrid = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });
  const { data, isFetching: isFetchingAllPawnTickets } = useGetAllPawnTickets({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Pawn Ticket ID", width: 150 },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => {
        if (params.value?.name) params.value = params.value?.name;
        return renderCellExpand(params);
      },
    },
    {
      field: "pawnDate",
      headerName: "Pawn Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleString([], { hour12: true }),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleString([], { hour12: true }),
    },
    {
      field: "principalAmount",
      headerName: "Principal Amount",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      minWidth: 150,
      flex: 1,
    },
    { field: "status", headerName: "Status", minWidth: 150, flex: 1 },
  ];

  return (
    <Box>
      {data?.pageData ? (
        <DataGrid
          rows={data?.pageData}
          rowCount={data?.pager?.totalItems || 0}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[DEFAULT_PAGE_SIZE]}
          paginationMode="server"
          autoHeight
          sx={{
            border: "1px solid",
            borderColor: "secondary.light",
            backgroundColor: "#ffffff",
            padding: 1,
          }}
          loading={isFetchingAllPawnTickets}
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: GridToolBar,
          }}
        />
      ) : null}
    </Box>
  );
};

export default AllPawnTicketsDrid;
