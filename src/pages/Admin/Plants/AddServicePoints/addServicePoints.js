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

import styles from "./addServicePoints.module.css";

const AddServicePoints = ({
  lineName,
  plantName,
  areaName,
  setShowModal,
  showModal,
}) => {
  const dispatch = useDispatch();

  const showHideClassName = showModal ? "displayblock" : "displaynone";

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
    setInputServicePoint({
      ...inputServicePoint,
      [event.target.name]: event.target.value,
    });
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
    setShowModal(false);
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

  const handleClose = () => {
    setInputServicePoints([]);
    setShowModal(false);
  };

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <h4>Agregar areas</h4>
        <div className={styles.colContent}>
          <div className={styles.container}>
            <form onSubmit={(e) => handleSubmitLines(e)} id="addServicePoint">
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
                <label>Código: </label>
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
                <select
                  name="aceria"
                  onChange={(e) => handleChangServicePoint(e)}
                >
                  <option value={false} selected>
                    No
                  </option>
                  <option value={true}>Si</option>
                </select>
              </div>
              <div>
                <label>Caloria </label>
                <select
                  name="caloria"
                  onChange={(e) => handleChangServicePoint(e)}
                >
                  <option value={false} selected>
                    No
                  </option>
                  <option value={true}>Si</option>
                </select>
              </div>
              <div>
                <label>Tarea Peligrosa </label>
                <select
                  name="tareaPeligrosa"
                  onChange={(e) => handleChangServicePoint(e)}
                >
                  <option value={false} selected>
                    No
                  </option>
                  <option value={true}>Si</option>
                </select>
              </div>
            </form>

            <div>
              <button
                key="addServicePoint"
                onClick={() => handleAddServicePoint()}
              >
                Agregar SP
              </button>
              <button
                type="submit"
                key="submitFormButton"
                form="addServicePoint"
              >
                Crear SP
              </button>
              <button onClick={() => handleClose()}>Cerrar</button>
            </div>
          </div>

          <div className={styles.inputsSPList}>
            <h5>Áreas a agregar:</h5>
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
      </section>
    </div>
  );
};

export default AddServicePoints;
