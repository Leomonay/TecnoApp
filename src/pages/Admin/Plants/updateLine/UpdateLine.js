import React from "react";
import { useDispatch } from "react-redux";
import {
  getPlantLocation,
  updateLine,
  getPlantLines
} from "../../../../actions/addPlantsActions.js";

const UpdateLine = ({ updateLineData, setUpdateLineData, plantName, areaName}) => {
  const dispatch = useDispatch();

  //Función boton editar una planta de la lista

const handleUpdateLine = async (event) => {
    setUpdateLineData({
    ...updateLineData,
    [event.target.name]: event.target.value,
  });
};
const handleSubmitUpdateArea = async (event) => {
  event.preventDefault();
  let response = await dispatch(updateLine(updateLineData));
  await dispatch(getPlantLocation(plantName));
  await dispatch(getPlantLines(areaName));
console.log('response',response)
  if (response.lineUpdated.acknowledged) {
    alert("Cambios Realizados");
  } else {
    alert("No se pudieron hacer los cambios");
  }
  setUpdateLineData({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });
};
//Fin funciones para editar una planta de la lista



  return (
    <div>
      <form
        onSubmit={(e) => handleSubmitUpdateArea(e)}
        id="updateLine"
      >
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="newName"
              autoComplete="off"
              value={updateLineData.newName}
              onChange={(e) => handleUpdateLine(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código: </label>
            <input
              type="text"
              name="newCode"
              autoComplete="off"
              value={updateLineData.newCode}
               onChange={(e) => handleUpdateLine(e)}
              placeholder="Ingrese el código..."
            />
          </div>
        </div>
      </form>
      <button type="submit" key="submitFormButton" form="updateLine">
        Guardar Cambios Linea
      </button>
    </div>
  );
};

export default UpdateLine;
