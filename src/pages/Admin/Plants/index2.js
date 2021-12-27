import React from "react";
import { useState } from "react";


export default function AdminPlants() {
  

  let [inputPlant, setInputPlant] = useState({
    namePlant: "",
    codePlant: "",
  });

  let [inputArea, setInputArea] = useState({
    nameArea: "",
    codeArea: "",
  });

  let [inputLines, setInputLines] = useState({
    nameLines: "",
    codeLines: "",
  });

  

  const handleChangePlant = (event) => {
    setInputPlant({ ...inputPlant, [event.target.name]: event.target.value });
  };

  const handleChangeArea = (event) => {
      console.log("event", event.target.value)
    areasObj = {...areasObj, [event.target.name]: event.target.value};
    console.log("obj", areasObj)
  };

  const addArea = () =>{
    setInputPlant({ ...inputPlant, areas: [...inputPlant.areas, areasObj] })
    areasObj = { nameArea: "", codeArea: "" };
  }

  return (
    <div>
      Administración de Plantas
      <div>
        <form>

          <div>
            <div>
              <label>Nombre Planta: </label>
              <input
                type="text"
                name="namePlant"
                value={inputPlant.namePlant}
                onChange={(event) => handleChangePlant(event)}
                placeholder="Ingrese nombre de la planta..."
              />
            </div>
            <div>
              <label>Código Planta: </label>
              <input
                type="text"
                name="codePlant"
                value={inputPlant.codePlant}
                onChange={(event) => handleChangePlant(event)}
                placeholder="Ingrese código de la planta..."
              />
            </div>
          </div>

          <div>
            <div>
              <label>Nombre Área: </label>
              <input
                type="text"
                name="nameArea"
                value={areasObj.nameArea}
                onChange={(event) => handleChangeArea(event)}
                placeholder="Ingrese nombre del área..."
              />
            </div>
            <div>
              <label>Código Área: </label>
              <input
                type="text"
                name="codeArea"
                value={areasObj.codeArea}
                onChange={(event) => handleChangeArea(event)}
                placeholder="Ingrese código del área..."
              />
            </div>
            <button onClick={()=>addArea()}>Agregar Área</button>
          </div>
        </form>
      </div>
    </div>
  );
}
