import React from "react";
import "../css/table.css";
import CsvExporter from "./csvExporter";

function TableCsv({ list }) {
  if (!list || list.length === 0) {
    return null;
  }
  const keys = Object.keys(list[0]);
  // console.log(list[0]);
  return (
    <div className="divTable">
      <table className="centered-table">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((obj, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>
                  {obj[key] instanceof Date
                    ? obj[key].toLocaleString()
                    : String(obj[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // <h2>
  //   {" "}
  //   Array[{" "}
  //   {list.map((i) => {
  //     if (i instanceof Date) {
  //       return i.toLocaleString() + " ";
  //     } else {
  //       return " " + String(i) + " ";
  //     }
  //   })}
  //   ]
  // </h2>
}
export default TableCsv;
