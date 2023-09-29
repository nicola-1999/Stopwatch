import { useRef, useState } from "react";
import "../css/fa-icons.min.css";
import "../css/App.css";

function Main(props) {
  const [time, setTime] = useState(0); // elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      setStartTime(new Date(startTime));
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setEndTime(new Date());
    }
  };

  const handleReset = () => {
    if (!isRunning) {
      setTime(0);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const formatTime = (milliseconds) => {
    const totalMilliseconds = Math.floor(milliseconds);
    const minutes = Math.floor((totalMilliseconds / 60000) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const ms = (totalMilliseconds % 1000).toString().padStart(3, "0");
    const truncatedMs = ms.slice(0, 2);

    const pad = (value) => {
      return value.toString().padStart(2, "0");
    };

    return `${pad(minutes)}:${pad(seconds)}:${truncatedMs}`;
  };

  const saveParams = () => {
    handleReset();
    props.onSubmit({ imei, driver, vehicle, startTime, endTime, behaviour });
  };

  //handle event ###########################################
  //name
  const [driver, setDriver] = useState("Lorenzo");
  //vehicle
  const [vehicle, setVehicle] = useState("Jeep");

  //imei
  const [imei, setImei] = useState("350544509653195");

  // change driver's event
  const [behaviour, setBehaviour] = useState("1");

  return (
    <>
      <h1 className="title">Design Stopwatch in React</h1>
      <div className="timer">
        <h2>
          {" "}
          <span className="fa-regular fa-stopwatch fa-xl"></span>{" "}
          {formatTime(time)}
        </h2>
        <div className="displayDate">
          <p>Start Time: {startTime ? startTime.toLocaleString() : "N/A"}</p>
          <p>End Time: {endTime ? endTime.toLocaleString() : "N/A"}</p>
        </div>
        <div>
          <button
            className="btnStart fa fa-play fa-xl"
            onClick={handleStart}
            onDoubleClick={handleStop}
          ></button>
          <button
            className="btnStart fa fa-stop fa-xl"
            onClick={handleStop}
            onDoubleClick={handleReset}
          ></button>
          <button
            className="btnStart fa-solid fa-rotate-left fa-xl"
            onClick={handleReset}
          ></button>
        </div>
      </div>

      <div className="formGroup">
        <div>
          <label>
            Guidatore{" "}
            <input
              className="left"
              name="nome"
              onChange={(e) => setDriver(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Veicolo{" "}
            <input
              className="left"
              name="veicolo"
              onChange={(e) => setVehicle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label> imei </label>
          <select
            className="selectImei"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          >
            <option value="350544509653195"> 350544509653195</option>
            <option value="867648043692068"> 867648043692068</option>
          </select>
        </div>

        <div className="divSelectCat">
          <label> Categoria </label>
          <select
            className="selectCat"
            value={behaviour}
            onChange={(e) => setBehaviour(e.target.value)}
          >
            <option value="1">Accelerazione rapida</option>
            <option value="2"> Frenata brusca</option>
            <option value="3"> Sterzata in curva irregolare</option>
            <option value="4"> Sterzata brusca</option>
          </select>
        </div>
      </div>
      <div className="divSubmit">
        <button
          className="btnSubmit" // fa-solid fa-paper-plane-top "
          onClick={saveParams}
        >
          <b>Salva</b>
        </button>
      </div>
    </>
  );
}

export default Main;
