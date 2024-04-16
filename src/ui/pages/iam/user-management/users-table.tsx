import { Stack } from "@mui/material";
import { Chip } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import {
  DEFAULT_PAGE_SIZE,
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT,
} from "../../../../constants/generic-constants";
import GridToolBar from "../../../../shared/components/grid-tool-bar";
import NoDataGrid from "../../../../shared/components/no-data-grid";
import renderCellExpand from "../../../../shared/components/render-cell-expand";
import Role from "../../../../shared/types/role";
import User from "../../../../shared/types/user";

export interface UsersTableProps {
  users?: Array<User>;
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

const UsersTable: FC<UsersTableProps> = ({
  users: data,
  isFetching,
  paginationModel,
  setPaginationModel,
  totalItems,
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "User ID",
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
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: 150,
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 150,
      renderCell: (params) => {
        const chips = params.value.map((role: Role) => (
          <Chip
            key={role.id}
            label={role.title}
            color={"primary"}
            size="small"
          />
        ));

        const renderName = (
          <Stack direction={"row"} gap={1} overflow={"auto"}>
            {chips}
          </Stack>
        );
        return renderCellExpand({ ...params, value: renderName as never });
      },
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

export default UsersTable;
