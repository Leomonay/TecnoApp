import React from "react";
import { useDispatch } from "react-redux";
import styles from "./LinesList.module.css";
import {
  getLineServicePoints,
  getPlantLines,
  getPlantLocation,
  deleteLine,
} from "../../../../actions/addPlantsActions.js";

export default function LinesList({
  lines,
  plantName,
  areaName,
  handleEditLine,
  setSelectedData,
  selectedData,
}) {
  const dispatch = useDispatch();

  const handleChangeLines = (e) => {
    if (e.target.checked) {
      dispatch(getLineServicePoints(e.target.value));
      setSelectedData({ ...selectedData, linesName: e.target.value });
    }
  };

  //Funcion para borrar una linea

  const handleDeleteLine = async (event) => {
    event.preventDefault();
    let response = await dispatch(deleteLine({ name: event.target.value }));
    if (response.message) {
      alert(response.message);
    } else {
      alert("El área fue borrada");
    }
    await dispatch(getPlantLocation(plantName));
    await dispatch(getPlantLines(areaName));
  };
  //Fin función para borrar una linea

  return (
    <div>
      <label>Lineas</label>
      <button title="Agregar Linea">Agregar Linea</button>
      <div className={styles.divScroll}>
        <div className={styles.containerLabel}>
          {lines.length !== 0 &&
            lines.map((element) => {
              return (
                <label key={"label" + element}>
                  <input
                    key={"input" + element}
                    type="radio"
                    id={element}
                    name="linesInput"
                    value={element}
                    onChange={(e) => handleChangeLines(e)}
                  />
                  {element}
                  <button
                    className={styles.removeButton}
                    title="Eliminar"
                    key={"delete" + element}
                    value={element}
                    onClick={(e) => handleDeleteLine(e)}
                  />
                  <button
                    className={styles.editButton}
                    title="Edit"
                    key={"edit" + element}
                    value={element}
                    onClick={(e) => handleEditLine(e)}
                  />
                </label>
              );
            })}
        </div>
      </div>
    </div>
  );
}
