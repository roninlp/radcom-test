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

  const handleCellChange = (row: number, col: number, value: string) => {
    const newCellValues = [...cellValues];
    const numValue = parseFloat(value);
    const isValid =
      value === "" || (!isNaN(numValue) && numValue >= 0 && numValue <= 1000);
    newCellValues[row][col] = { value, isValid };
    setCellValues(newCellValues);
  };

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
              className={`h-10 w-full text-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                cell.isValid ? "bg-white" : "bg-red-100"
              }`}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="mt-8 flex h-full w-full flex-col gap-6">
      <div className="w-full overflow-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white">
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      <button
        onClick={sortRows}
        className="mb-4 transform rounded-lg bg-green-500 px-6 py-3 font-bold text-white transition duration-200 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        مرتب کن
      </button>
    </div>
  );
};
