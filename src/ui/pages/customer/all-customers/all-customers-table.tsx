import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import {
  DEFAULT_PAGE_SIZE,
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT,
} from "../../../../constants/generic-constants";
import GridToolBar from "../../../../shared/components/grid-tool-bar";
import NoDataGrid from "../../../../shared/components/no-data-grid";
import useTextFormatter from "../../../../shared/hooks/use-text-formatter";
import Customer from "../../../../shared/types/customer";

export interface CustomersTableProps {
  customers?: Array<Customer>;
  totalItems?: number;
  paginationModel?: {
    pageSize: number;
    page: number;
  };
  setPaginationModel?: React.Dispatch<
    React.SetStateAction<{
      pageSize: number;
      page: number;
    }>
  >;
  isFetching?: boolean;
}

const AllCustomersTable: FC<CustomersTableProps> = ({
  customers: data,
  isFetching,
  paginationModel,
  setPaginationModel,
  totalItems,
}) => {
  const { formatPhoneNumber } = useTextFormatter();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Customer ID",
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      flex: 1,
      valueGetter: (params) => {
        return params.value ? params.value : "-";
      },
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: 150,
      flex: 1,
      valueGetter: (params) => {
        return formatPhoneNumber ? formatPhoneNumber(params.value) : "-";
      },
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      flex: 1,
    },
  ];

  return (
    <DataGrid
      rows={data || []}
      rowCount={totalItems || data?.length || 0}
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
      loading={isFetching}
      slots={{
        loadingOverlay: LinearProgress,
        toolbar: GridToolBar,
        noRowsOverlay: NoDataGrid,
      }}
    />
  );
};

export default AllCustomersTable;
