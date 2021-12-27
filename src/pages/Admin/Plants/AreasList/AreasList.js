import React from "react";
import {
  getPlantLines,
  deleteArea,
  getPlantLocation,
} from "../../../../actions/addPlantsActions.js";
import { useDispatch } from "react-redux";
import styles from "./AreasList.module.css";

export default function AreasList({ areas, plantName, handleEditArea,setSelectedData,selectedData }) {
  const dispatch = useDispatch();

  const handleChangeAreas = (e) => {
    if (e.target.checked) {
      dispatch(getPlantLines(e.target.value));
      setSelectedData({ ...selectedData, areaName: e.target.value });
    }
  };

  //Funcion para borrar una planta

  const handleDeleteArea = async (event) => {
    event.preventDefault();
    let response = await dispatch(deleteArea({ name: event.target.value }));
    if (response.message) {
      alert(response.message);
    } else {
      alert("El área fue borrada");
    }
    dispatch(getPlantLocation(plantName));
  };
  //Fin función para borrar una planta

  return (
    <div>
      <label>Areas</label>
      <button title="Agregar Area">Agregar Area</button>
      <div className={styles.divScroll}>
        <div className={styles.containerLabel}>
          {areas.length !== 0 &&
            areas.map((element) => {
              return (
                <label key={"label" + element}>
                  <input
                    key={"input" + element}
                    type="radio"
                    id={element}
                    name="areasInput"
                    value={element}
                    onChange={(e) => handleChangeAreas(e)}
                  />
                  {element}
                  <button
                    className={styles.removeButton}
                    title="Eliminar"
                    key={"delete" + element}
                    value={element}
                    onClick={(e) => handleDeleteArea(e)}
                  />
                  <button
                    className={styles.editButton}
                    title="Edit"
                    key={"edit" + element}
                    value={element}
                    onClick={(e) => handleEditArea(e)}
                  />
                </label>
              );
            })}
        </div>
      </div>
    </div>
  );
}
