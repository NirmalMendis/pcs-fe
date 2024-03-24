/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { FC } from "react";

export interface TableColumn {
  header: string;
  accessor: string;
  align?: "left" | "center" | "right";
  render?: (value: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
}

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "subColor",
})(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "inherit",
    color: theme.palette.primary.dark,
    fontSize: 12,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "inherit",
  },
}));

const GenericTable: FC<TableProps> = ({ columns, data }) => {
  return (
    <TableContainer>
      <Table
        aria-label="generic table"
        sx={{ borderCollapse: "separate", borderSpacing: "0px 10px" }}
        size="small"
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index} align={column.align || "left"}>
                {column.header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "inherit" }}>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column, columnIndex) => (
                <StyledTableCell
                  key={columnIndex}
                  align={column.align || "left"}
                >
                  {column.render
                    ? column.render(item[column.accessor])
                    : item[column.accessor]}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
