/* eslint-disable @typescript-eslint/no-explicit-any */
import { TablePaginationProps } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import { GridPagination, useGridRootProps } from "@mui/x-data-grid";

const Pagination = ({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) => {
  const rootProps = useGridRootProps();
  const pageCount =
    rootProps?.rowCount && rootProps.paginationModel?.pageSize
      ? Math.ceil(rootProps.rowCount / rootProps.paginationModel?.pageSize)
      : 0;

  return (
    <MuiPagination
      color="primary"
      shape="rounded"
      size="small"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
};

const CustomPagination = (props: any) => {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
};

export default CustomPagination;
