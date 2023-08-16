import React, { useState } from "react";
import * as XLSX from "xlsx";

export const ExcelToTable = () => {
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target?.result as string;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      if (data.length > 0) {
        setColumns(data[0]);
        setExcelData(data.slice(1));
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClearData = () => {
    setExcelData([]);
    setColumns([]);
  };

  return (
    <div
      className="excel-table-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="drag-drop-area">
        <p>Drag and drop an Excel file here</p>
      </div>
      <button
        className="action-button"
        onClick={() => handleClearData()}
        type="reset"
      >
        {" "}
        Refresh Data
      </button>
      <table className="excel-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
