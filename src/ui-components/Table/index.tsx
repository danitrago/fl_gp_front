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
      <div className="flex justify-between align-baseline mb-4">
        <div>
          {/* <Button>Descargar</Button> */}
        </div>
        <div className="flex items-center">
          <i className="fa fa-search text-primary mr-2 mb-1"></i>
          {/* <span className="mb-1 text-primary font-bold mr-3"><i className="fa fa-search mr-1"></i> Buscar</span> */}
          <Input
            name="buscar"
            placeholder="Buscar en la tabla..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full overflow-auto rounded-md border shadow-sm">
        <table className="w-full" {...getTableProps()}>
          <thead className="bg-gray-800 text-white">
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
                        className="py-3 px-5 whitespace-nowrap text-left text-sm"
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
                <tr className="even:bg-slate-100" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="py-3 px-5 whitespace-nowrap text-left text-sm md:text-base"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-400 text-white">
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
                        className="py-3 px-5 whitespace-nowrap text-left text-sm"
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
      </div>
      <div className="mt-3">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <i className="text-primary fa fa-arrow-left"></i>
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className="text-primary fa fa-chevron-circle-left"></i>
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <i className="text-primary fa fa-chevron-circle-right"></i>
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <i className="text-primary fa fa-arrow-right"></i>
        </button>{" "}
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        {/* <span>
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
        </span>{" "} */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar: {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
