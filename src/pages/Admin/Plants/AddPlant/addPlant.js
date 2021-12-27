import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getPlantList,
  addPlant,
} from "../../../../actions/addPlantsActions.js";

const AddPlant = () => {
  const dispatch = useDispatch();

  let [inputPlant, setInputPlant] = useState({
    name: "",
    code: "",
  });

  //Función crear planta
  const handleChangePlant = (event) => {
    setInputPlant({ ...inputPlant, [event.target.name]: event.target.value });
  };

  const handleSubmitPlant = async (event) => {
    event.preventDefault();
    let response = await dispatch(addPlant(inputPlant));

    dispatch(getPlantList());
    if (response.message) {
      alert(response.message);
    } else {
      alert("La planta " + response.plantStored.name + " fue creada");
    }
    setInputPlant({
      name: "",
      code: "",
    });
  };
  //Fin de la función para agregar una planta nueva

  return (
    <div>
      <form onSubmit={(e) => handleSubmitPlant(e)} id="addPlant">
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={inputPlant.name}
              onChange={(e) => handleChangePlant(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código </label>
            <input
              type="text"
              name="code"
              autoComplete="off"
              value={inputPlant.code}
              onChange={(e) => handleChangePlant(e)}
              placeholder="Ingrese el código..."
            />
          </div>
        </div>
      </form>
      <button type="submit" key="submitFormButton" form="addPlant">
        Crear Planta
      </button>
    </div>
  );
};

export default AddPlant;
