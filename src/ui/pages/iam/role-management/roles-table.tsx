import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import useGetAllRoles from "../../../../api/role/use-get-all-roles";
import {
  DEFAULT_PAGE_SIZE,
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT,
} from "../../../../constants/generic-constants";
import GridToolBar from "../../../../shared/components/grid-tool-bar";
import NoDataGrid from "../../../../shared/components/no-data-grid";
import { OrderDirection } from "../../../../shared/types/generic";

const RolesTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });

  const { data, isFetching: isFetchingUsers } = useGetAllRoles({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    orderBy: "createdAt",
    orderDirection: OrderDirection.DESC,
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Role ID",
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      flex: 1,
    },
  ];

  return (
    <DataGrid
      rows={data?.pageData || []}
      rowCount={data?.pager.totalItems || data?.pageData.length || 0}
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
      loading={isFetchingUsers}
      slots={{
        loadingOverlay: LinearProgress,
        toolbar: GridToolBar,
        noRowsOverlay: NoDataGrid,
      }}
    />
  );
};

export default RolesTable;
