import React from "react";
import { useState } from "react";
import {
  getPlantList,
  deletePlant,
  getPlantData,
  getPlantLocation,
} from "../../../../actions/addPlantsActions.js";
import { useDispatch } from "react-redux";

import styles from "./PlantList.module.css";
import AddPlant from "../AddPlant/addPlant.js";
import UpdatePlant from "../UpdatePlant/UpdatePlant.js";

export default function PlantList({ plants, setSelectedData, selectedData }) {
  const dispatch = useDispatch();
  let [showModal, setShowModal] = useState(false);
  let [showModalUpdate, setShowModalUpdate] = useState(false);
  //Función boton editar una planta de la lista
  let [updatePlantData, setUpdatePlantData] = useState({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });

  const handleEditPlant = async (event) => {
    let response = await dispatch(getPlantData(event.target.value));
    setUpdatePlantData({
      newName: response.name,
      newCode: response.code,
      oldName: response.name,
      oldCode: response.code,
    });
    setShowModalUpdate(true)
  };
  //Fin funciones para editar un area de la lista

  //Funcion para borrar una planta

  const handleDeletePlant = async (event) => {
    let plantLocations = await dispatch(getPlantLocation(event.target.value));
    if (Object.keys(plantLocations).length === 0) {
      let response = await dispatch(deletePlant({ name: event.target.value }));
      if (response.message) {
        alert(response.message);
      } else {
        alert("La planta fue borrada");
      }
      dispatch(getPlantList());
    } else {
      alert("La planta contiene ÁREAS debe eliminarlas primero");
    }
  };
  //Fin función para borrar una planta

  const handleChangePlants = (e) => {
    if (e.target.checked) {
      dispatch(getPlantLocation(e.target.value));
      setSelectedData({plantName: e.target.value,areaName: "",
      linesName: "",
      spName: "", });
    }
  };

 
  return (
    <div>
      <AddPlant setShowModal={setShowModal} showModal={showModal} />

      <UpdatePlant
        setUpdatePlantData={setUpdatePlantData}
        updatePlantData={updatePlantData}
        setShowModalUpdate={setShowModalUpdate} showModalUpdate={showModalUpdate}
      />
      <div>
        <label>Plantas</label>
        <button title="Agregar Planta" onClick={() => setShowModal(true)}>
          Agregar Planta
        </button>
        <div className={styles.divScroll}>
          <div className={styles.containerLabel}>
            {plants.length !== 0 &&
              plants.map((element) => {
                return (
                  <label key={"label" + element}>
                    <input
                      key={"input" + element}
                      type="radio"
                      id={element}
                      name="plantsInput"
                      value={element}
                      onChange={(e) => handleChangePlants(e)}
                    />
                    {element}

                    <button
                      key={"delete" + element}
                      className={styles.removeButton}
                      title="Eliminar"
                      value={element}
                      onClick={(e) => handleDeletePlant(e)}
                    />
                    <button
                      className={styles.editButton}
                      title="Edit"
                      key={"edit" + element}
                      value={element}
                      onClick={(e) => handleEditPlant(e)}
                    />
                  </label>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
