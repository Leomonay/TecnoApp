import React from "react";
import { useDispatch } from "react-redux";
import {useEffect, useState } from "react";
import {
  getPlantLocation,
  getPlantLines,
  getLineServicePoints,
  updateServicePoint,
} from "../../../../actions/addPlantsActions.js";

const UpdateSP = ({
  updateSPData1,
  setUpdateSPData1,
  plantName,
  areaName,
  lineName,
}) => {
  const dispatch = useDispatch();

  let [updateSPData,setUpdateSPData] = useState({
    newName: "",
    newCode: "",
    newGate: "",
    newAceria: false,
    newCaloria: false,
    newTareaPeligrosa: false,
    oldName: "",
    oldCode: "",
    oldGate: "",
    oldAceria: false,
    oldCaloria: false,
    oldTareaPeligrosa: false,
  })
useEffect(() => {
    setUpdateSPData(updateSPData1)
}, [updateSPData1])
  //Función boton editar una planta de la lista

  const handleUpdateSP = async (event) => {
    console.log(event);
    if (event.target.name === "aceria") {
      if (event.target.checked) {
        setUpdateSPData({
          ...updateSPData,
          newAceria: true,
        });
      } else {
        setUpdateSPData({
          ...updateSPData,
          newAceria: false,
        });
      }
    } else if (event.target.name === "caloria") {
      if (event.target.checked) {
        setUpdateSPData({
          ...updateSPData,
          newCaloria: true,
        });
      } else {
        setUpdateSPData({
          ...updateSPData,
          newCaloria: false,
        });
      }
    } else if (event.target.name === "tareaPeligrosa") {
      if (event.target.checked) {
        setUpdateSPData({
          ...updateSPData,
          newTareaPeligrosa: true,
        });
      } else {
        setUpdateSPData({
          ...updateSPData,
          newTareaPeligrosa: false,
        });
      }
    } else {
      setUpdateSPData({
        ...updateSPData,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmitUpdateArea = async (event) => {
    event.preventDefault();
    let response = await dispatch(updateServicePoint(updateSPData));
    await dispatch(getPlantLocation(plantName));
    await dispatch(getPlantLines(areaName));
    await dispatch(getLineServicePoints(lineName));
    console.log("response", response);
    if (response.spUpdated.acknowledged) {
      alert("Cambios Realizados");
    } else {
      alert("No se pudieron hacer los cambios");
    }
    setUpdateSPData({
      newName: "",
      newCode: "",
      newGate: "",
      newAceria: false,
      newCaloria: false,
      newTareaPeligrosa: false,
      oldName: "",
      oldCode: "",
      oldGate: "",
      oldAceria: false,
      oldCaloria: false,
      oldTareaPeligrosa: false,
    });
  };
  //Fin funciones para editar una planta de la lista

  return (
    <div>
      <form onSubmit={(e) => handleSubmitUpdateArea(e)} id="updateSP">
        <div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name="newName"
              autoComplete="off"
              value={updateSPData.newName}
              onChange={(e) => handleUpdateSP(e)}
              placeholder="Ingrese el nombre..."
            />
          </div>
          <div>
            <label>Código: </label>
            <input
              type="text"
              name="newCode"
              autoComplete="off"
              value={updateSPData.newCode}
              onChange={(e) => handleUpdateSP(e)}
              placeholder="Ingrese el código..."
            />
          </div>

          <div>
            <label>Puerta </label>
            <input
              type="text"
              name="newGate"
              autoComplete="off"
              value={updateSPData.newGate}
              onChange={(e) => handleUpdateSP(e)}
              placeholder="Ingrese la puerta..."
            />
          </div>
          <div>
            <label>Aceria </label>
            <input
              type="checkbox"
              name="newAceria"
              checked={updateSPData.newAceria}
              onChange={(e) => handleUpdateSP(e)}
            />
          </div>
          <div>
            <label>Caloria </label>
            <input
              type="checkbox"
              name="newCaloria"
              checked={updateSPData.newCaloria}
              onChange={(e) => handleUpdateSP(e)}
            />
          </div>
          <div>
            <label>Tarea Peligrosa </label>
            <input
              type="checkbox"
              name="newTareaPeligrosa"
              checked={updateSPData.newTareaPeligrosa}
              onChange={(e) => handleUpdateSP(e)}
            />
          </div>
        </div>
      </form>
      <button type="submit" key="submitFormButton" form="updateSP">
        Guardar Cambios SP
      </button>
    </div>
  );
};

export default UpdateSP;
