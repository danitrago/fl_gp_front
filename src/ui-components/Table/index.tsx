import React from "react";
import { Column, useTable, useGlobalFilter, usePagination } from "react-table";
import Button from "../Button";
import { Input } from "../FormHooked";

type TTableProps = {
  columns: readonly Column<{}>[];
  data: readonly {}[];
};

const Table = (props: TTableProps) => {
  const { columns, data } = props;

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    // pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="flex justify-between align-baseline border-b pb-3 mb-4">
        <div>
          <Input
            name="buscar"
            placeholder="Buscar en la tabla..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div>
          <Button>Descargar</Button>
        </div>
      </div>
      <table {...getTableProps()}>
        <thead className="bg-dark text-white">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup: any) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column: any) => (
                    // Apply the header cell props
                    <th
                      className="w-60 p-2 text-left"
                      {...column.getHeaderProps()}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="even:bg-slate-200" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="w-60 p-2 text-left" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-dark text-white">
          {
            // Loop over the header rows
            footerGroups.map((footerGroup: any) => (
              // Apply the header row props
              <tr {...footerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  footerGroup.headers.map((column: any) => (
                    // Apply the header cell props
                    <th
                      className="w-60 p-2 text-left"
                      {...column.getHeaderProps()}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
