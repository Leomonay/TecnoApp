import React from "react";
import { useDispatch } from "react-redux";
import {
  getPlantList,
  updatePlant
} from "../../../../actions/addPlantsActions.js";

const UpdatePlant = ({ updatePlantData, setUpdatePlantData}) => {
  const dispatch = useDispatch();


 //Función boton editar una planta de la lista

const handleUpdatePlant = async (event) => {
  setUpdatePlantData({
    ...updatePlantData,
    [event.target.name]: event.target.value,
  });
};
const handleSubmitUpdatePlant = async (event) => {
  event.preventDefault();
  let response = await dispatch(updatePlant(updatePlantData));

  dispatch(getPlantList());

  if (response.plantUpdated.acknowledged) {
    alert("Cambios Realizados");
  } else {
    alert("No se pudieron hacer los cambios");
  }
  setUpdatePlantData({
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
        onSubmit={(e) => handleSubmitUpdatePlant(e)}
        id="updatePlant"
      >
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="newName"
              autoComplete="off"
              value={updatePlantData.newName}
              onChange={(e) => handleUpdatePlant(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código </label>
            <input
              type="text"
              name="newCode"
              autoComplete="off"
              value={updatePlantData.newCode}
               onChange={(e) => handleUpdatePlant(e)}
              placeholder="Ingrese el código..."
            />
          </div>
        </div>
      </form>
      <button type="submit" key="submitFormButton" form="updatePlant">
        Guardar Cambios
      </button>
    </div>
  );
};

export default UpdatePlant;
