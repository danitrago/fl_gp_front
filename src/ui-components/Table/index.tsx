import React from "react";
import { Column, useTable, useGlobalFilter } from "react-table";
import Button from "../Button";
import { Input } from "../FormHooked";

type TTableProps = {
  columns: readonly Column<{}>[];
  data: readonly {}[];
};

const Table = (props: TTableProps) => {
  const { columns, data } = props;

  const tableInstance = useTable({ columns, data }, useGlobalFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

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
          {
            // Loop over the table rows
            rows.map((row: any) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr className="even:bg-slate-200" {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell: any) => {
                      // Apply the cell props
                      return (
                        <td
                          className="w-60 p-2 text-left"
                          {...cell.getCellProps()}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
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
    </>
  );
};

export default Table;
