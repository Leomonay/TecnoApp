import React from "react";
import styles from "./SPList.module.css";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
  getLineServicePoints,
  getPlantLines,
  getPlantLocation,
  deleteServicePoint,
  getSPData,
} from "../../../../actions/addPlantsActions.js";

import AddServicePoints from "../AddServicePoints/addServicePoints";
import UpdateSP from "../UpdateSP/UpdateSP";

export default function SPList({
  servicePoints,
  plantName,
  areaName,
  lineName,
}) {
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);
  let [showModalUpdate, setShowModalUpdate] = useState(false);
  let [habilButtonCreate, setHabilButtonCreate] = useState(true);

  useEffect(() => {
    if (lineName !== "") setHabilButtonCreate(false);
    else setHabilButtonCreate(true);
  }, [lineName]);

  //Función boton editar un SP de la lista
  let [updateSPData, setUpdateSPData] = useState({
    newName: "",
    newCode: "",
    newGate: "",
    newAceria: false,
    newCaloria: false,
    newTareaPeligrosa: false,
    oldName: "",
    oldCode: "",
  });

  const handleEditServicePoint = async (event) => {
    let response = await dispatch(getSPData(event.target.value));
    setUpdateSPData({
      newName: response.name,
      newCode: response.code,
      newGate: response.gate,
      newAceria: response.aceria,
      newCaloria: response.caloria,
      newTareaPeligrosa: response.tareaPeligrosa,
      oldName: response.name,
      oldCode: response.code,
    });
    setShowModalUpdate(true);
  };

  //Fin funciones para editar un SP de la lista

  //Funcion para borrar un SP

  const handleDeleteSP = async (event) => {
    event.preventDefault();
    let servicePointData = await dispatch(getSPData(event.target.value));
    if (servicePointData.devices.length === 0) {
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
    } else {
      alert("El SP contiene EQUIPOS debe eliminarlos primero");
    }
  };
  //Fin función para borrar un SP

  return (
    <div>
      <AddServicePoints
        lineName={lineName}
        plantName={plantName}
        areaName={areaName}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      <UpdateSP
        setUpdateSPData={setUpdateSPData}
        updateSPData={updateSPData}
        lineName={lineName}
        plantName={plantName}
        areaName={areaName}
        setShowModalUpdate={setShowModalUpdate}
        showModalUpdate={showModalUpdate}
      />

      <label>Puntos de Servicio</label>

      {habilButtonCreate ? (
        <button
          key="submitFormButton"
          title="Agregar Area"
          disabled={habilButtonCreate}
          className="disabledButton"
        >
          Agregar Pto. Serv.
        </button>
      ) : (
        <button
          title="Agregar Pto. Serv."
          onClick={() => setShowModal(true)}
          disabled={habilButtonCreate}
        >
          Agregar Pto. Serv.
        </button>
      )}

      <div className={styles.divScrollServPoints}>
        <div className={styles.containerLabel}>
          {servicePoints.length !== 0 &&
            servicePoints.map((element) => {
              return (
                <div className={styles.cuerpo} key={"divCuerpo" + element}>
                  <label key={"label" + element}>{element}</label>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
