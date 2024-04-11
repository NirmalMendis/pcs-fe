import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllPawnTickets from "../../../../api/pawn-ticket/use-get-all-pawn-tickets";
import { StatusColors } from "../../../../constants/color-constants";
import {
  DD_MM_YYY_FORMAT,
  DEFAULT_PAGE_SIZE,
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT,
} from "../../../../constants/generic-constants";
import ROUTE_PATHS from "../../../../constants/route-paths";
import GridToolBar from "../../../../shared/components/grid-tool-bar";
import NoDataGrid from "../../../../shared/components/no-data-grid";
import ProfileAvatar from "../../../../shared/components/profile-avatar";
import renderCellExpand from "../../../../shared/components/render-cell-expand";
import useTextFormatter from "../../../../shared/hooks/use-text-formatter";
import { PawnTicketStatusEnum } from "../../../../shared/types/generic";

const AllPawnTicketsDrid = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });

  const [filters, setFilters] = useState<{
    startDate?: Date;
    endDate?: Date;
    status?: PawnTicketStatusEnum;
  }>({});

  const {
    data,
    isFetching: isFetchingAllPawnTickets,
    refetch,
  } = useGetAllPawnTickets({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    orderBy: "createdAt",
    orderDirection: "DESC",
    ...filters,
  });

  const { formatRs } = useTextFormatter();
  const navigate = useNavigate();

  const onChangeStartDate = (value: Date | null) => {
    if (value)
      setFilters((prev) => ({
        ...prev,
        startDate: value,
      }));
  };

  const onChangeEndDate = (value: Date | null) => {
    if (value)
      setFilters((prev) => ({
        ...prev,
        endDate: value,
      }));
  };

  const onChangeStatus = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value)
      setFilters((prev) => ({
        ...prev,
        status: event.target.value as PawnTicketStatusEnum,
      }));
  };

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
      renderCell: (params) => format(new Date(params.value), DD_MM_YYY_FORMAT),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => format(new Date(params.value), DD_MM_YYY_FORMAT),
    },
    {
      field: "principalAmount",
      headerName: "Principal Amount",
      minWidth: 150,
      flex: 1,
      cellClassName: "bold-text",
      valueGetter: (params) => {
        const formatedAmount = formatRs ? formatRs(String(params.value)) : "";
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
      field: "monthlyInterest",
      headerName: "Monthly Interest",
      minWidth: 150,
      flex: 1,
      cellClassName: "bold-text",
      valueGetter: (params) => {
        const formatedAmount = formatRs ? formatRs(String(params.value)) : "";
        return formatedAmount;
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
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

  useEffect(() => {
    if (filters.endDate && filters.startDate) refetch();
  }, [refetch, filters.endDate, filters.startDate]);

  useEffect(() => {
    if (filters.status) refetch();
  }, [refetch, filters.status]);

  return (
    <Stack
      sx={{
        "& .bold-text": {
          fontWeight: "bold",
        },
        marginTop: "20px !important",
      }}
      spacing={2}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <DatePicker
          label="Start date"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          disableFuture
          value={filters.startDate}
          onChange={onChangeStartDate}
        />
        <DatePicker
          label="End date"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          value={filters.endDate}
          onChange={onChangeEndDate}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select label="Status" onChange={onChangeStatus}>
            {Object.values(PawnTicketStatusEnum).map((value) => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <DataGrid
        rows={data?.pageData || []}
        rowCount={data?.pager?.totalItems || 0}
        rowHeight={MUI_DATAGRID_DEFAULT_ROW_HEIGHT}
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
    </Stack>
  );
};

export default AllPawnTicketsDrid;
