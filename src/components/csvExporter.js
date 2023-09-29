import React from "react";
import "../css/csvExporter.css";

function CsvExporter({ data, filename }) {
  const downloadCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," + encodeURIComponent(data);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", filename || "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="divExport">
      <button className="btnExport" onClick={downloadCsv}>
        Export CSV
      </button>
    </div>
  );
}

export default CsvExporter;
