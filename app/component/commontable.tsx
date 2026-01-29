"use client";
import { useState, useMemo } from "react";
import { EyeIcon } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function CommonTable({
  showActions = false,
  enableSelection = false,
  setAddModelpopup,
  list,
  findId,
  setGetAction,
  selectedRows,
  setSelectedRows,
}) {
  const tableRows = Array.isArray(list) ? list : [];
  const [searchText, setSearchText] = useState<{ [key: string]: string }>({});

  const columns =
    tableRows.length > 0
      ? [...Object.keys(tableRows[0]), ...(showActions ? ["__actions__"] : [])]
      : [];

  const cell = "px-3 py-3 text-sm border border-gray-300";
  const headCell = `${cell} text-left text-[#0F172A] bg-[#DBEAFA] border-t-0`;

  const handleSelectRow = (row: any) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tableRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...tableRows]);
    }
  };

  // Filter rows based on searchText
  const filteredRows = useMemo(() => {
    return tableRows.filter((row) =>
      columns.every((col) => {
        if (col === "__actions__") return true;
        const search = searchText[col]?.toLowerCase() || "";
        return String(row[col]).toLowerCase().includes(search);
      })
    );
  }, [tableRows, columns, searchText]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm sm:text-base border-collapse">
        {/* ================= HEADER ================= */}
        <thead>
          <tr>
            {enableSelection && (
              <th className={`${headCell} w-12 text-center`}>
                <input
                  type="checkbox"
                  checked={
                    tableRows.length > 0 &&
                    selectedRows.length === tableRows.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
            )}

            {columns.map((col, index) => (
              <th
                key={col}
                className={`${headCell}
                  ${index === 0 && !enableSelection ? "border-l-0" : ""}
                  ${index === columns.length - 1 ? "border-r-0" : ""}
                `}
              >
                {col === "__actions__" ? "Actions" : col}
              </th>
            ))}
          </tr>

          {/* ================= SEARCH ROW ================= */}
          <tr>
            {enableSelection && <th className={`${headCell} bg-gray-100`}></th>}
            {columns.map((col) => (
              <th key={col} className={`${headCell} bg-gray-100`}>
                {col !== "__actions__" && (
                  <div className="flex items-center gap-2 rounded-md px-2 bg-gray-100">
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />

                    <input
                      type="text"
                      value={searchText[col] || ""}
                      onChange={(e) =>
                        setSearchText((prev) => ({
                          ...prev,
                          [col]: e.target.value,
                        }))
                      }
                      placeholder={col}
                      className="w-full text-sm text-gray-900 placeholder-gray-400
               focus:outline-none bg-transparent"
                    />
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {filteredRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (enableSelection ? 1 : 0)}
                className="text-center py-6 text-gray-500 border border-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            filteredRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-[#0F172A]/10 transition-all"
              >
                {enableSelection && (
                  <td className={`${cell} text-center`}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleSelectRow(row)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}

                {columns.map((col, index) => (
                  <td
                    key={col}
                    className={`${cell}
                      ${index === 0 && !enableSelection ? "border-l-0" : ""}
                      ${index === columns.length - 1 ? "border-r-0" : ""}
                    `}
                  >
                    {col === "__actions__" ? (
                      <div className="flex gap-2 ml-4 items-center">
                        <button
                          className="text-gray-500 hover:text-[#0F172A]"
                          onClick={() => {
                            findId(row["Sequence Code"]);
                            setAddModelpopup(true);
                            setGetAction("view");
                          }}
                        >
                          <EyeIcon className="w-5 h-5 cursor-pointer" />
                        </button>
                      </div>
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
