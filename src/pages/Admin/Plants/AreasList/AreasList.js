import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  getPlantLines,
  deleteArea,
  getPlantLocation,
  getAreaData,
} from "../../../../actions/addPlantsActions.js";

import AddAreas from "../AddAreas/addAreas.js";
import UpdateArea from "../UpdateArea/UpdateArea.js";

import styles from "./AreasList.module.css";

export default function AreasList({
  areas,
  plantName,
  setSelectedData,
  selectedData,
}) {
  const dispatch = useDispatch();
  let [showModal, setShowModal] = useState(false);
  let [showModalUpdate, setShowModalUpdate] = useState(false);
  let [habilButtonCreate, setHabilButtonCreate] = useState(true);

  useEffect(() => {
    if (plantName !== "") setHabilButtonCreate(false);
  });

  useEffect(() => {
    if (plantName !== "") setHabilButtonCreate(false);
    else setHabilButtonCreate(true);
  }, [plantName]);

  const handleChangeAreas = (e) => {
    if (e.target.checked) {
      dispatch(getPlantLines(e.target.value));
      setSelectedData({
        ...selectedData,
        areaName: e.target.value,
        linesName: "",
        spName: "",
      });
    }
  };

  //Función boton editar un area de la lista
  let [updateAreaData, setUpdateAreaData] = useState({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });

  const handleEditArea = async (event) => {
    let response = await dispatch(getAreaData(event.target.value));
    setUpdateAreaData({
      newName: response.name,
      newCode: response.code,
      oldName: response.name,
      oldCode: response.code,
    });
    setShowModalUpdate(true);
  };
  //Fin funciones para editar un area de la lista

  //Funcion para borrar una planta

  const handleDeleteArea = async (event) => {
    event.preventDefault();
    let plantLocations = await dispatch(getPlantLocation(plantName));

    if (plantLocations[event.target.value].length === 0) {
      let response = await dispatch(deleteArea({ name: event.target.value }));
      if (response.message) {
        alert(response.message);
      } else {
        alert("El área fue borrada");
      }
      dispatch(getPlantLocation(plantName));
    } else {
      alert("La planta contiene LÍNEAS debe eliminarlas primero");
    }
  };
  //Fin función para borrar una planta

  return (
    <div>
      <AddAreas
        plantName={plantName}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      <UpdateArea
        setUpdateAreaData={setUpdateAreaData}
        updateAreaData={updateAreaData}
        plantName={plantName}
        setShowModalUpdate={setShowModalUpdate}
        showModalUpdate={showModalUpdate}
      />

      <div>
        <label>Areas</label>
        <button
          title="Agregar Area"
          onClick={() => setShowModal(true)}
          disabled={habilButtonCreate}
        >
          Agregar Area
        </button>
        <div className={styles.divScroll}>
          <div className={styles.containerLabel}>
            {areas.length !== 0 &&
              areas.map((element) => {
                return (
                  <div className={styles.cuerpo}>
                    <input
                      key={"input" + element}
                      type="radio"
                      id={element}
                      name="areasInput"
                      value={element}
                      onChange={(e) => handleChangeAreas(e)}
                    />
                    <label key={"label" + element}>{element}</label>
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
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
