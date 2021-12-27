import React from "react";
import {
  getPlantList,
  deletePlant,
  getPlantLocation,
} from "../../../../actions/addPlantsActions.js";
import { useDispatch } from "react-redux";

import styles from "./PlantList.module.css";

export default function PlantList({
  plants,
  handleEditPlant,
  setSelectedData,
  selectedData,
}) {
  const dispatch = useDispatch();
  //Funcion para borrar una planta

  const handleDeletePlant = async (event) => {
    event.preventDefault();
    let response = await dispatch(deletePlant({ name: event.target.value }));
    if (response.message) {
      alert(response.message);
    } else {
      alert("La planta fue borrada");
    }
    dispatch(getPlantList());
  };
  //Fin función para borrar una planta

  const handleChangePlants = (e) => {
    if (e.target.checked) {
      dispatch(getPlantLocation(e.target.value));
      setSelectedData({ ...selectedData, plantName: e.target.value });
    }
  };

  return (
    <div>
      <label>Plantas</label>
      <button title="Agregar Planta">Agregar Planta</button>
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
                  key={'delete'+element}
                    className={styles.removeButton}
                    title="Eliminar"
                    value={element}
                    onClick={(e) => handleDeletePlant(e)}
                  />
                  <button
                    className={styles.editButton}
                    title="Edit"
                    key={'edit'+element}
                    value={element}
                    onClick={(e) => handleEditPlant(e)}
                  />
                </label>
              );
            })}
        </div>
      </div>
    </div>
  );
}
