import { useRef, useState, useEffect } from "react";
import "./css/App.css";
import "./css/fa-icons.min.css";
import Papa from "papaparse";
import "./components/tableCsv";
import TableCsv from "./components/tableCsv";
import Main from "./components/main";
import CsvExporter from "./components/csvExporter";

// dependencies
//npm install papaparse
//npm install react-table react-csv

function App() {
  window.onbeforeunload = function () {
    return " ";
  };
  // list of elements
  const [list, setList] = useState([]);

  const csvData =
    "imei,name,vehicle,startTime,endTime,behavior\n" +
    //  list.map((obj) => Object.values(obj).join(",")).join("\n");

    list
      .map((obj) => {
        return Object.keys(obj)
          .map((key) => {
            const value =
              obj[key] instanceof Date
                ? obj[key].toLocaleString()
                : String(obj[key]);
            return `"${value}"`; // Wrap values in double quotes to handle special characters
          })
          .join(","); // Join the values with commas
      })
      .join("\n"); // Join rows with newline characters

  // list.map((i) => {
  //   i = Object.values(i);
  //   let x = " ";
  //   if (i instanceof Date) {
  //     x = i.toLocaleString() + ",";
  //   } else {
  //     x = String(i) + ",";
  //   }
  //   return x + "\n";
  // });

  //submit
  //in prevList ci sono tutte le registrazioni precedenti
  const handleSubmit = ({
    imei,
    driver,
    vehicle,
    startTime,
    endTime,
    behaviour,
  }) => {
    // e.preventDefault();
    setList((prevList) => {
      return [
        ...prevList,
        {
          imei: imei,
          driver: driver,
          vehicle: vehicle,
          startTime: startTime,
          endTime: endTime,
          behaviour: behaviour,
        },
      ];
    });
  };

  //table + csv

  return (
    <div className="App">
      <Main onSubmit={handleSubmit} />
      <div>
        <TableCsv list={list} />
      </div>
      <div>
        {list.length > 5 && <CsvExporter data={csvData} filename="table.csv" />}
      </div>
    </div>
  );
}

export default App;
