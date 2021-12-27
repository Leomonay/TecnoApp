import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getPlantLines,
  getPlantLocation,
  addLine,
  getAreaData,
} from "../../../../actions/addPlantsActions.js";

const AddLines = ({ areaName, plantName }) => {
  const dispatch = useDispatch();

  let [inputLine, setInputLine] = useState({
    name: "",
    code: "",
  });
  let [inputLines, setInputLines] = useState([]);

  //Función crear lineas
  const handleChangLine = (event) => {
    setInputLine({ ...inputLine, [event.target.name]: event.target.value });
  };

  const handleSubmitLines = async (event) => {
    event.preventDefault();
    let areaCode = await dispatch(getAreaData(areaName));
    let datos = { lines: inputLines, areaCode: areaCode.code };
    let response = await dispatch(addLine(datos));
    await dispatch(getPlantLocation(plantName));
    await dispatch(getPlantLines(areaName));
    if (response.length === 0) {
      alert(response.message);
    } else {
      alert("Las areas fueron creadas");
    }
    setInputLines([]);
    setInputLine({
      name: "",
      code: "",
    });
  };
  //Fin de la función para agregar una planta nueva

  const hanldeDeleteLine = (event) => {
    setInputLines(
      inputLines.filter((countr) => countr.code !== event.target.value)
    );
  };

  //Funcion para agregar areas al listado
  const handleAddLine = () => {
    setInputLines([...inputLines, inputLine]);
    setInputLine({
      name: "",
      code: "",
    });
  };

  //fin funmción de agregar áreas al listado

  return (
    <div>
      <form onSubmit={(e) => handleSubmitLines(e)} id="addLine">
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={inputLine.name}
              onChange={(e) => handleChangLine(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código </label>
            <input
              type="text"
              name="code"
              autoComplete="off"
              value={inputLine.code}
              onChange={(e) => handleChangLine(e)}
              placeholder="Ingrese el código..."
            />
          </div>
        </div>
      </form>
      <button key="addLine" onClick={() => handleAddLine()}>
        Agregar Linea
      </button>
      <button type="submit" key="submitFormButton" form="addLine">
        Crear Lineas
      </button>
      <div>
        {inputLines.length !== 0 &&
          inputLines.map((element) => {
            return (
              <div>
                <span>
                  {element.name} {element.code}
                </span>
                <button
                  onClick={(event) => hanldeDeleteLine(event)}
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

export default AddLines;
