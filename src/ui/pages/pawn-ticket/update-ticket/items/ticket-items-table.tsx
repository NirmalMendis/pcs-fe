import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { LinearProgress, Stack, Typography } from "@mui/material";
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
import {
  ItemDetailKey,
  ItemDetailMeta,
} from "../../../../../shared/types/generic";
import { Item, ItemDetailType } from "../../../../../shared/types/item";

export interface TicketItemsTableProps {
  items?: Array<
    Pick<Item, "id" | "description" | "appraisedValue" | "pawningAmount"> & {
      itemDetails: Array<Pick<ItemDetailType, "type" | "value">>;
    }
  >;
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
  const { formatRs } = useTextFormatter();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      width: 40,
      filterable: false,
      sortable: false,
      hideable: false,
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
      field: "itemDetails",
      headerName: "Item Details",
      minWidth: columnMinWidth,
      flex: 1,
      renderCell: (params) => {
        return params.value && params.value.length ? (
          <Stack width={"100%"}>
            {params.value?.map(
              (detail: Pick<ItemDetailType, "type" | "value">) => (
                <Stack
                  key={detail?.type}
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={1}
                  flexWrap="wrap"
                >
                  <Typography fontWeight={600}>{`${ItemDetailMeta[
                    detail.type as ItemDetailKey
                  ]?.label}`}</Typography>
                  <Typography>{`${detail?.value} ${ItemDetailMeta[
                    detail.type as ItemDetailKey
                  ]?.unit}`}</Typography>
                </Stack>
              )
            )}
          </Stack>
        ) : (
          "-"
        );
      },
    },
    {
      field: "appraisedValue",
      headerName: "Appraised Value",
      minWidth: columnMinWidth,
      align: "right",
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
      align: "right",
      cellClassName: "bold-text",
      renderCell: (params) => {
        if (formatRs) return formatRs(String(params.value));
      },
    },
  ];

  return (
    <DataGrid
      rows={data || []}
      rowCount={totalItems || data?.length || 0}
      rowHeight={MUI_DATAGRID_DEFAULT_ROW_HEIGHT + 15}
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
