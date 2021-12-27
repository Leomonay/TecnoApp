import React from "react";
import styles from "./SPList.module.css";

import { useDispatch } from "react-redux";

import {
  getLineServicePoints,
  getPlantLines,
  getPlantLocation,
  deleteServicePoint,
} from "../../../../actions/addPlantsActions.js";

export default function SPList({
  servicePoints,
  plantName,
  areaName,
  lineName,
  handleEditServicePoint,
}) {
  const dispatch = useDispatch();

  //Funcion para borrar un SP

  const handleDeleteSP = async (event) => {
    event.preventDefault();
    let response = await dispatch(
      deleteServicePoint({ name: event.target.value })
    );
    if (response.message) {
      alert(response.message);
    } else {
      alert("El SP fue borrado");
    }
    await dispatch(getPlantLocation(plantName));
    await dispatch(getPlantLines(areaName));
    await dispatch(getLineServicePoints(lineName));
  };
  //Fin función para borrar un SP

  return (
    <div>
      <label>Puntos de Servicio</label>

      <button title="Agregar Pto. Serv.">Agregar Pto. Serv.</button>
      <div className={styles.divScrollServPoints}>
        <div className={styles.containerLabel}>
          {servicePoints.length !== 0 &&
            servicePoints.map((element) => {
              return (
                <label key={"label" + element}>
                  {element}
                  <button
                    className={styles.removeButton}
                    title="Eliminar"
                    key={"delete" + element}
                    value={element}
                    onClick={(e) => handleDeleteSP(e)}
                  />
                 <button
                    className={styles.editButton}
                    title="Edit"
                    key={"edit" + element}
                    value={element}
                    onClick={(e) => handleEditServicePoint(e)}
                  />
                </label>
              );
            })}
        </div>
      </div>
    </div>
  );
}
