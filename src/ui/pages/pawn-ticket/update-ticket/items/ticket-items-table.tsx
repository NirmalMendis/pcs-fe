import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import {
  DEFAULT_PAGE_SIZE,
  MUI_DATAGRID_DEFAULT_HEIGHT,
  MUI_DATAGRID_DEFAULT_ROW_HEIGHT,
} from "../../../../../constants/generic-constants";
import NoDataGrid from "../../../../../shared/components/no-data-grid";
import CustomPagination from "../../../../../shared/components/pagination";
import useTextFormatter from "../../../../../shared/hooks/use-text-formatter";
import { Item } from "../../../../../shared/types/item";
import { TicketFormItem } from "../../create-ticket/create-ticket";

export interface TicketItemsTableProps {
  items?: Array<Partial<Item> & Partial<TicketFormItem>>;
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
  columnMinWidth?: number;
}

const TicketItemsTable: FC<TicketItemsTableProps> = ({
  items: data,
  totalItems,
  paginationModel,
  setPaginationModel,
  isFetching,
  columnMinWidth = 100,
}) => {
  const { formatCaratage, formatRs, formatWeight } = useTextFormatter();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      minWidth: 50,
      filterable: false,
      sortable: false,
      hideable: false,
      flex: 1,
      renderCell: () => {
        return <LabelImportantIcon sx={{ color: "success.light" }} />;
      },
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: columnMinWidth,
      flex: 1,
    },
    {
      field: "caratage",
      headerName: "Caratage",
      minWidth: columnMinWidth,
      flex: 1,
      renderCell: (params) => {
        if (formatCaratage) return formatCaratage(String(params.value));
      },
    },
    {
      field: "appraisedValue",
      headerName: "Appraised Value",
      minWidth: columnMinWidth,
      flex: 1,
      renderCell: (params) => {
        if (formatRs) return formatRs(String(params.value));
      },
    },
    {
      field: "pawningAmount",
      headerName: "Pawning Amount",
      minWidth: columnMinWidth,
      flex: 1,
      cellClassName: "bold-text",
      renderCell: (params) => {
        if (formatRs) return formatRs(String(params.value));
      },
    },
    {
      field: "weight",
      headerName: "Weight",
      minWidth: columnMinWidth,
      flex: 1,
      renderCell: (params) => {
        if (formatWeight) return formatWeight(String(params.value));
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
      paginationMode={paginationModel ? "server" : "client"}
      sx={{
        height: MUI_DATAGRID_DEFAULT_HEIGHT,
        border: "none",
        backgroundColor: "inherit",
        padding: 1,
        "--DataGrid-overlayHeight": "200px",
      }}
      initialState={
        !paginationModel
          ? {
              pagination: {
                paginationModel: { pageSize: DEFAULT_PAGE_SIZE, page: 0 },
              },
            }
          : undefined
      }
      loading={isFetching}
      slots={{
        loadingOverlay: LinearProgress,
        noRowsOverlay: NoDataGrid,
        pagination: paginationModel ? CustomPagination : undefined,
      }}
    />
  );
};

export default TicketItemsTable;
