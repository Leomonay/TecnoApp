import React from "react";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./LinesList.module.css";

import {
  getLineServicePoints,
  getPlantLines,
  getPlantLocation,
  deleteLine,getLineData
} from "../../../../actions/addPlantsActions.js";

import AddLines from "../AddLines/addLines";
import UpdateLine from "../updateLine/UpdateLine";

export default function LinesList({
  lines,
  plantName,
  areaName,
  setSelectedData,
  selectedData,
}) {
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);
  let [showModalUpdate, setShowModalUpdate] = useState(false);
  let [habilButtonCreate, setHabilButtonCreate] = useState(true);

  useEffect(() => {
    if (areaName !== "") setHabilButtonCreate(false);
  });

  useEffect(() => {
    if (areaName !== "") setHabilButtonCreate(false);
    else setHabilButtonCreate(true);
  }, [areaName]);

  const handleChangeLines = (e) => {
    if (e.target.checked) {
      dispatch(getLineServicePoints(e.target.value));
      setSelectedData({ ...selectedData, linesName: e.target.value,
        spName: "" });
    }
  };

  //Función boton editar una linea de la lista
  let [updateLineData, setUpdateLineData] = useState({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });

  const handleEditLine = async (event) => {
    let response = await dispatch(getLineData(event.target.value));

    setUpdateLineData({
      newName: response.name,
      newCode: response.code,
      oldName: response.name,
      oldCode: response.code,
    });

    setShowModalUpdate(true)
  };

  //Fin funciones para editar una linea de la lista

  //Funcion para borrar una linea

  const handleDeleteLine = async (event) => {
    event.preventDefault();
    let plantLocations = await dispatch(getLineServicePoints(event.target.value));
    if (plantLocations.length === 0) {
    let response = await dispatch(deleteLine({ name: event.target.value }));
    if (response.message) {
      alert(response.message);
    } else {
      alert("El área fue borrada");
    }
    await dispatch(getPlantLocation(plantName));
    await dispatch(getPlantLines(areaName));}else {
      alert("La planta contiene LÍNEAS debe eliminarlas primero");
    }
  };
  //Fin función para borrar una linea

  return (
    <div>

<AddLines
        areaName={areaName}
        plantName={plantName}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      <UpdateLine
        setUpdateLineData={setUpdateLineData}
        updateLineData={updateLineData}
        plantName={selectedData.plantName}
        areaName={selectedData.areaName}
        setShowModalUpdate={setShowModalUpdate}
        showModalUpdate={showModalUpdate}
      />


      <label>Lineas</label>
      <button title="Agregar Linea" onClick={() => setShowModal(true)} disabled={habilButtonCreate}>Agregar Linea</button>
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
