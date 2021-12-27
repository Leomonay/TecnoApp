import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getPlantLines,
  getPlantLocation,
  addServPoint,
  getLineData,
  getLineServicePoints,
} from "../../../../actions/addPlantsActions.js";

const AddServicePoints = ({ lineName, plantName, areaName }) => {
  const dispatch = useDispatch();

  let [inputServicePoint, setInputServicePoint] = useState({
    name: "",
    code: "",
    gate: "",
    aceria: false,
    caloria: false,
    tareaPeligrosa: false,
  });
  let [inputServicePoints, setInputServicePoints] = useState([]);

  //Función crear lineas
  const handleChangServicePoint = (event) => {
    // if (event.target.name === "aceria") {
    //   if (event.target.checked) {
    //     setInputServicePoint({
    //       ...inputServicePoint,
    //       aceria: true,
    //     });
    //   } else {
    //     setInputServicePoint({
    //       ...inputServicePoint,
    //       aceria: false,
    //     });
    //   }
    // } else if (event.target.name === "caloria") {
    //   if (event.target.checked) {
    //     setInputServicePoint({
    //       ...inputServicePoint,
    //       caloria: true,
    //     });
    //   } else {
    //     setInputServicePoint({
    //       ...inputServicePoint,
    //       caloria: false,
    //     });
    //   }
    // } else if (event.target.name === "tareaPeligrosa") {
    //   if (event.target.checked) {
    //     setInputServicePoint({
    //       ...inputServicePoint,
    //       tareaPeligrosa: true,
    //     });
    //   } else {
    //     setInputServicePoint({
    //       ...inputServicePoint,
    //       tareaPeligrosa: false,
    //     });
    //   }
    // } else {

      setInputServicePoint({
        ...inputServicePoint,
        [event.target.name]: event.target.value,
      });
      console.log('imputservicepoint',inputServicePoint)
   // }
  };

  const handleSubmitLines = async (event) => {
    event.preventDefault();

    let lineCode = await dispatch(getLineData(lineName));
    let datos = { servPoints: inputServicePoints, lineCode: lineCode.code };
    let response = await dispatch(addServPoint(datos));
    await dispatch(getPlantLocation(plantName));
    await dispatch(getPlantLines(areaName));
    await dispatch(getLineServicePoints(lineName));
    if (response.length === 0) {
      alert(response.message);
    } else {
      alert("Los Service Points fueron creados");
    }
    setInputServicePoints([]);
    setInputServicePoint({
      name: "",
      code: "",
      gate: "",
      aceria: false,
      caloria: false,
      tareaPeligrosa: false,
    });
  };
  //Fin de la función para agregar una planta nueva

  const hanldeDeleteServicePoint = (event) => {
    setInputServicePoints(
      inputServicePoints.filter((countr) => countr.code !== event.target.value)
    );
  };

  //Funcion para agregar areas al listado
  const handleAddServicePoint = () => {
    setInputServicePoints([...inputServicePoints, inputServicePoint]);
    setInputServicePoint({
      name: "",
      code: "",
      gate: "",
      aceria: false,
      caloria: false,
      tareaPeligrosa: false,
    });
  };

  //fin funmción de agregar áreas al listado

  return (
    <div>
      <form onSubmit={(e) => handleSubmitLines(e)} id="addServicePoint">
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={inputServicePoint.name}
              onChange={(e) => handleChangServicePoint(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código </label>
            <input
              type="text"
              name="code"
              autoComplete="off"
              value={inputServicePoint.code}
              onChange={(e) => handleChangServicePoint(e)}
              placeholder="Ingrese el código..."
            />
          </div>
          <div>
            <label>Puerta </label>
            <input
              type="text"
              name="gate"
              autoComplete="off"
              value={inputServicePoint.gate}
              onChange={(e) => handleChangServicePoint(e)}
              placeholder="Ingrese la puerta..."
            />
          </div>

          <div>
            <label>Aceria </label>
            <select name="aceria" onChange={(e) => handleChangServicePoint(e)}>
              <option value={false} selected>
                No
              </option>
              <option value={true}>Si</option>
            </select>
          </div>
          <div>
            <label>Caloria </label>
            <select name="caloria" onChange={(e) => handleChangServicePoint(e)}>
              <option value={false} selected>
                No
              </option>
              <option value={true}>Si</option>
            </select>
          </div>
          <div>
            <label>Tarea Peligrosa </label>
            <select name="tareaPeligrosa" onChange={(e) => handleChangServicePoint(e)}>
              <option value={false} selected>
                No
              </option>
              <option value={true}>Si</option>
            </select>
          </div>

          {/* <div>
            <label>Aceria </label>
            <input
              type="checkbox"
              name="aceria"
              //value={inputServicePoint.aceria}
              checked={inputServicePoint.aceria}
              onChange={(e) => handleChangServicePoint(e)}
            />
          </div>
          <div>
            <label>Caloria </label>
            <input
              type="checkbox"
              name="caloria"
              //value={inputServicePoint.caloria}
              checked={inputServicePoint.caloria}
              onChange={(e) => handleChangServicePoint(e)}
            />
          </div>
          <div>
            <label>Tarea Peligrosa </label>
            <input
              type="checkbox"
              name="tareaPeligrosa"
              //value={inputServicePoint.tareaPeligrosa}
              checked={inputServicePoint.tareaPeligrosa}
              onChange={(e) => handleChangServicePoint(e)}
            />
          </div> */}
        </div>
      </form>
      <button key="addServicePoint" onClick={() => handleAddServicePoint()}>
        Agregar Service Point
      </button>
      <button type="submit" key="submitFormButton" form="addServicePoint">
        Crear Service Point
      </button>
      <div>
        {inputServicePoints.length !== 0 &&
          inputServicePoints.map((element) => {
            return (
              <div>
                <span>
                  {element.name} {element.code}
                </span>
                <button
                  onClick={(event) => hanldeDeleteServicePoint(event)}
                  key={element.name}
                  value={element.code}
                  id={element.name + element.code}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddServicePoints;
