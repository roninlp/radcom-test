import React, { useState, useEffect } from "react";

interface TableGeneratorProps {
  width: number;
  height: number;
}

type CellData = {
  value: string;
  isValid: boolean;
};

export const TableGenerator: React.FC<TableGeneratorProps> = ({
  width,
  height,
}) => {
  const [cellValues, setCellValues] = useState<CellData[][]>([]);

  // initialize the table with empty cells
  useEffect(() => {
    const initialCellValues = Array(height)
      .fill(null)
      .map(() =>
        Array(width)
          .fill(null)
          .map(() => ({ value: "", isValid: true })),
      );
    setCellValues(initialCellValues);
  }, [width, height]);

  // update the cell value when the user types in the input and validate the input
  const handleCellChange = (row: number, col: number, value: string) => {
    const newCellValues = [...cellValues];
    const numValue = parseFloat(value);
    const isValid =
      value === "" || (!isNaN(numValue) && numValue >= 0 && numValue <= 1000);
    newCellValues[row][col] = { value, isValid };
    setCellValues(newCellValues);
  };

  // handle sorting the table
  const sortRows = () => {
    const sortedCellValues = cellValues.map((row, rowIndex) => {
      const validCells = row.filter(
        (cell) => cell.isValid && cell.value !== "",
      );
      const invalidCells = row.filter(
        (cell) => !cell.isValid || cell.value === "",
      );

      validCells.sort((a, b) => {
        const aValue = parseFloat(a.value);
        const bValue = parseFloat(b.value);
        return rowIndex % 2 === 0 ? aValue - bValue : bValue - aValue;
      });

      return [...validCells, ...invalidCells];
    });

    setCellValues(sortedCellValues);
  };

  const renderTable = () => {
    return cellValues.map((row, i) => (
      <tr key={i}>
        {row.map((cell, j) => (
          <td key={`${i},${j}`} className="border border-gray-300 p-1">
            <input
              type="text"
              value={cell.value}
              onChange={(e) => handleCellChange(i, j, e.target.value)}
              className={`w-full text-center ${cell.isValid ? "" : "bg-red-200"}`}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="mt-8 flex h-full w-full flex-col gap-4">
      <div className="w-full overflow-auto">
        <table className="w-full border-collapse">
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      <button
        onClick={sortRows}
        className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
      >
        مرتب کن
      </button>
    </div>
  );
};
