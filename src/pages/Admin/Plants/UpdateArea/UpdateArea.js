import React from "react";
import { useDispatch } from "react-redux";
import {
  getPlantLocation,
  updateArea
} from "../../../../actions/addPlantsActions.js";

const UpdateArea = ({ updateAreaData, setUpdateAreaData, plantName}) => {
  const dispatch = useDispatch();

  //Función boton editar una planta de la lista

const handleUpdateArea = async (event) => {
  setUpdateAreaData({
    ...updateAreaData,
    [event.target.name]: event.target.value,
  });
};
const handleSubmitUpdateArea = async (event) => {
  event.preventDefault();
  let response = await dispatch(updateArea(updateAreaData));

  dispatch(getPlantLocation(plantName));
console.log('response',response)
  if (response.areaUpdated.acknowledged) {
    alert("Cambios Realizados");
  } else {
    alert("No se pudieron hacer los cambios");
  }
  setUpdateAreaData({
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
        id="updateArea"
      >
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="newName"
              autoComplete="off"
              value={updateAreaData.newName}
              onChange={(e) => handleUpdateArea(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código </label>
            <input
              type="text"
              name="newCode"
              autoComplete="off"
              value={updateAreaData.newCode}
               onChange={(e) => handleUpdateArea(e)}
              placeholder="Ingrese el código..."
            />
          </div>
        </div>
      </form>
      <button type="submit" key="submitFormButton" form="updateArea">
        Guardar Cambios Area
      </button>
    </div>
  );
};

export default UpdateArea;
