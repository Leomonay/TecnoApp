import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getPlantLocation,
  addArea,
  getPlantData,
} from "../../../../actions/addPlantsActions.js";

import styles from "./addAreas.module.css";

const AddAreas = ({ plantName, setShowModal, showModal }) => {
  const dispatch = useDispatch();

  const showHideClassName = showModal ? "displayblock" : "displaynone";

  let [inputArea, setInputArea] = useState({
    name: "",
    code: "",
  });
  let [inputAreas, setInputAreas] = useState([]);

  //Función crear area
  const handleChangArea = (event) => {
    setInputArea({ ...inputArea, [event.target.name]: event.target.value });
  };

  const handleSubmitAreas = async (event) => {
    event.preventDefault();
    let plantCode = await dispatch(getPlantData(plantName));

    let datos = { areas: inputAreas, plantCode: plantCode.code };

    let response = await dispatch(addArea(datos));

    await dispatch(getPlantLocation(plantName));
    if (response.length === 0) {
      alert(response.message);
    } else {
      alert("Las areas fueron creadas");
    }
    setInputAreas([]);
    setInputArea({
      name: "",
      code: "",
    });
    setShowModal(false);
  };
  //Fin de la función para agregar una planta nueva

  const hanldeDeleteArea = (event) => {
    setInputAreas(
      inputAreas.filter((countr) => countr.code !== event.target.value)
    );
  };

  //Funcion para agregar areas al listado
  const handleAddArea = () => {
    setInputAreas([...inputAreas, inputArea]);
    setInputArea({
      name: "",
      code: "",
    });
  };

  //fin funmción de agregar áreas al listado

  const handleClose = () =>{
    setInputAreas([])
    setShowModal(false)
  }

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <h4>Agregar areas</h4>
        <div className={styles.colContent}>
          <div className={styles.container}>
            <form onSubmit={(e) => handleSubmitAreas(e)} id="addArea">
              <div>
                <label>Nombre: </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={inputArea.name}
                  onChange={(e) => handleChangArea(e)}
                  placeholder="Ingrese el nombre..."
                />
              </div>
              <div>
                <label>Código: </label>
                <input
                  type="text"
                  name="code"
                  autoComplete="off"
                  value={inputArea.code}
                  onChange={(e) => handleChangArea(e)}
                  placeholder="Ingrese el código..."
                />
              </div>
            </form>
            <div>
              <button key="addArea" onClick={() => handleAddArea()}>
                Agregar Area
              </button>
              <button type="submit" key="submitFormButton" form="addArea">
                Crear Areas
              </button>
              <button onClick={() => handleClose()}>Cerrar</button>
            </div>
          </div>

          <div className={styles.inputsAreasList}>
            <h5>Áreas a agregar:</h5>
            {inputAreas.length !== 0 &&
              inputAreas.map((element) => {
                return (
                  <div>
                    <span>
                      {element.name} {element.code}
                    </span>
                    <button
                      onClick={(event) => hanldeDeleteArea(event)}
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

export default AddAreas;
