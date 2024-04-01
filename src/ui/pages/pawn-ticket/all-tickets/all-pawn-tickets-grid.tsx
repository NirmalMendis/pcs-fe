import {
  Box,
  Button,
  Chip,
  ChipOwnProps,
  LinearProgress,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllPawnTickets from "../../../../api/pawn-ticket/use-get-all-pawn-tickets";
import {
  CURRENCY_PREFIX,
  DEFAULT_PAGE_SIZE,
} from "../../../../constants/generic-constants";
import ROUTE_PATHS from "../../../../constants/route-paths";
import GridToolBar from "../../../../shared/components/grid-tool-bar";
import NoDataGrid from "../../../../shared/components/no-data-grid";
import ProfileAvatar from "../../../../shared/components/profile-avatar";
import renderCellExpand from "../../../../shared/components/render-cell-expand";
import { PawnTicketStatusEnum } from "../../../../shared/types/generic";

const AllPawnTicketsDrid = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });
  const { data, isFetching: isFetchingAllPawnTickets } = useGetAllPawnTickets({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    orderBy: "createdAt",
    orderDirection: "DESC",
  });
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Pawn Ticket ID",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              navigate(`../${ROUTE_PATHS.PAWN_TICKET.UPDATE}/${params.value}`, {
                relative: "path",
              })
            }
          >
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => {
        const renderName = (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
            gap={2}
          >
            <ProfileAvatar name={params.value?.name} size="small" />
            <Typography>{params.value?.name}</Typography>
          </Box>
        );
        return renderCellExpand({ ...params, value: renderName as never });
      },
    },
    {
      field: "pawnDate",
      headerName: "Pawn Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "principalAmount",
      headerName: "Principal Amount",
      minWidth: 150,
      flex: 1,
      cellClassName: "bold-text",
      valueGetter: (params) => {
        const formatedAmount = `${CURRENCY_PREFIX}${params.value}`;
        return formatedAmount;
      },
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        const formatedAmount = `${params.value} %`;
        return formatedAmount;
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        let color: ChipOwnProps["color"] = undefined;

        switch (params.value) {
          case PawnTicketStatusEnum.ACTIVE:
            color = "success";
            break;
          case PawnTicketStatusEnum.DUE:
            color = "error";
            break;
          case PawnTicketStatusEnum.RECOVERED:
            color = "info";
            break;
          case PawnTicketStatusEnum.FORFEITED:
            color = "default";
            break;
        }
        return <Chip label={params.value} color={color} size="small" />;
      },
    },
  ];

  return (
    <Box
      sx={{
        "& .bold-text": {
          fontWeight: "bold",
        },
      }}
    >
      <DataGrid
        rows={data?.pageData || []}
        rowCount={data?.pager?.totalItems || 0}
        rowHeight={35}
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
          "--DataGrid-overlayHeight": "200px",
        }}
        loading={isFetchingAllPawnTickets}
        slots={{
          loadingOverlay: LinearProgress,
          toolbar: GridToolBar,
          noRowsOverlay: NoDataGrid,
        }}
      />
    </Box>
  );
};

export default AllPawnTicketsDrid;
